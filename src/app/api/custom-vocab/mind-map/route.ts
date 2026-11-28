import { NextResponse } from 'next/server';
import { isGeminiConfigured, getGeminiModel, generateContentGemini } from '@/lib/ai/gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
  generateContentCloudflare,
} from '@/lib/ai/cloudflare-provider';
import { canUseProvider, checkUserAIQuota, recordUserAIUsage } from '@/lib/ai/system-ai-settings';
import { allVocabularyWords } from '@/data/vocabulary';
import { getBaseFormInfo } from '@/lib/dictionary';
import {
  isEligibleForVocabMindMap,
  normalizeCustomMindMapData,
  RawCustomMindMapPayload,
} from '@/lib/mind-map/customVocabMindMap';
import { CustomItemType, CustomVocabMindMapData } from '@/types/custom-vocab';

interface RequestBody {
  text: string;
  type?: CustomItemType;
  explanation?: string;
  context?: string;
  ipa?: string;
  partOfSpeech?: string;
  userId?: string;
  userEmail?: string;
  guestId?: string;
}

function safeParseJsonObject<T>(str: string): T | null {
  try {
    let clean = str.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
    }
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      clean = match[0];
    }
    return JSON.parse(clean) as T;
  } catch {
    return null;
  }
}

function hasAnyBranch(mindMap: CustomVocabMindMapData): boolean {
  return (
    mindMap.synonyms.length > 0 ||
    mindMap.antonyms.length > 0 ||
    mindMap.collocations.length > 0 ||
    mindMap.relatedWords.length > 0 ||
    Object.values(mindMap.wordFamily).some(Boolean)
  );
}

async function generateSmartMindMapFallback(params: {
  text: string;
  explanation?: string;
  ipa?: string;
  partOfSpeech?: string;
}): Promise<CustomVocabMindMapData> {
  const trimmed = params.text.trim();
  const rawLower = trimmed.toLowerCase();
  const baseLower = getBaseFormInfo(trimmed).baseForm.trim().toLowerCase();

  // 1. Check built-in TOEIC vocabulary dataset first for rich semantic links
  const matched = allVocabularyWords.find((w) => {
    const wl = w.word.toLowerCase();
    return wl === rawLower || wl === baseLower;
  });

  if (matched) {
    return normalizeCustomMindMapData(
      {
        coreConcept: params.explanation?.trim() || matched.deepMeaning?.coreConcept,
        ipa: params.ipa || matched.pronunciation?.ipa,
        partOfSpeech: params.partOfSpeech || matched.partOfSpeech?.join(', '),
        rootInfo: matched.etymology?.rootWord
          ? {
              root: matched.etymology.rootWord,
              meaning: matched.etymology.rootMeaning,
              origin: matched.etymology.origin,
            }
          : undefined,
        synonyms: matched.synonyms,
        antonyms: matched.antonyms,
        wordFamily: matched.wordFamily,
        collocations: matched.examples?.collocations,
        relatedWords: matched.relatedWords,
      },
      {
        centerWord: trimmed,
        fallbackCoreConcept: params.explanation,
        fallbackIpa: params.ipa,
        fallbackPartOfSpeech: params.partOfSpeech,
        provider: 'fallback',
      }
    );
  }

  // 2. Try public dictionary API for single words / short terms
  const synonyms: string[] = [];
  const antonyms: string[] = [];
  let dictIpa = params.ipa;
  let dictPos = params.partOfSpeech;
  let dictDef = '';

  if (trimmed.split(/\s+/).length <= 2) {
    try {
      const dictRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(rawLower)}`,
        { next: { revalidate: 86400 } }
      );
      if (dictRes.ok) {
        const dictData = await dictRes.json();
        if (Array.isArray(dictData) && dictData.length > 0) {
          const entry = dictData[0];
          if (!dictIpa) {
            dictIpa =
              entry.phonetic ||
              entry.phonetics?.find((p: { text?: string }) => p.text)?.text ||
              undefined;
          }
          const meanings = Array.isArray(entry.meanings) ? entry.meanings : [];
          if (!dictPos && meanings[0]?.partOfSpeech) {
            dictPos = meanings[0].partOfSpeech;
          }
          for (const m of meanings) {
            if (Array.isArray(m.synonyms)) synonyms.push(...m.synonyms);
            if (Array.isArray(m.antonyms)) antonyms.push(...m.antonyms);
            if (Array.isArray(m.definitions)) {
              for (const d of m.definitions) {
                if (!dictDef && d.definition) dictDef = d.definition;
                if (Array.isArray(d.synonyms)) synonyms.push(...d.synonyms);
                if (Array.isArray(d.antonyms)) antonyms.push(...d.antonyms);
              }
            }
          }
        }
      }
    } catch {
      // ignore network error
    }
  }

  return normalizeCustomMindMapData(
    {
      coreConcept: params.explanation?.trim() || dictDef,
      ipa: dictIpa,
      partOfSpeech: dictPos,
      synonyms,
      antonyms,
      wordFamily: {},
      collocations: [],
      relatedWords: [],
    },
    {
      centerWord: trimmed,
      fallbackCoreConcept: params.explanation || dictDef,
      fallbackIpa: dictIpa,
      fallbackPartOfSpeech: dictPos,
      provider: 'fallback',
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const {
      text,
      type,
      explanation,
      context,
      ipa,
      partOfSpeech,
      userId,
      userEmail,
      guestId,
    } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp từ vựng để tạo Mind Map.' },
        { status: 400 }
      );
    }

    if (!isEligibleForVocabMindMap({ type, text })) {
      return NextResponse.json(
        {
          error:
            'Tính năng tạo Vocab Mind Map bằng AI chỉ áp dụng cho Từ vựng, không áp dụng cho Mẫu câu.',
        },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();
    const effectiveUserId = userId || request.headers.get('x-user-id') || undefined;
    const effectiveEmail = userEmail || request.headers.get('x-user-email') || undefined;
    const effectiveGuestId = guestId || request.headers.get('x-guest-id') || undefined;

    // 1. Check AI quota
    const quotaCheck = await checkUserAIQuota({
      userId: effectiveUserId,
      userEmail: effectiveEmail,
      guestId: effectiveGuestId,
    });

    if (!quotaCheck.allowed) {
      const fallbackMindMap = await generateSmartMindMapFallback({
        text: trimmedText,
        explanation,
        ipa,
        partOfSpeech,
      });
      return NextResponse.json({
        success: true,
        mindMap: fallbackMindMap,
        provider: 'fallback',
        isFallback: true,
        fallbackReason: quotaCheck.reason || 'Hạn mức AI hôm nay đã đạt giới hạn.',
      });
    }

    // 2. Build prompt for structured Vocabulary Mind Map
    const prompt = `You are a Business English & TOEIC lexical semantics expert.
Create a rich, accurate Vocabulary Mind Map JSON for an English learner's personal vocabulary notebook.

Target Vocabulary: "${trimmedText}"
${partOfSpeech ? `Known Part of Speech: "${partOfSpeech}"` : ''}
${ipa ? `Known IPA: "${ipa}"` : ''}
${explanation ? `Learner's Note / Explanation: "${explanation}"` : ''}
${context ? `Context Example: "${context}"` : ''}

Instructions:
1. "coreConcept": A clear, memorable 1-2 sentence explanation in Vietnamese capturing the core meaning & TOEIC/workplace nuance of "${trimmedText}".
2. "ipa": Standard IPA transcription enclosed in slashes, e.g. "/ˈmɪtɪɡeɪt/".
3. "partOfSpeech": Concise part of speech in English & Vietnamese, e.g. "verb (động từ)", "noun (danh từ)", "adjective (tính từ)", "phrasal verb (cụm động từ)".
4. "rootInfo": If the word has a clear Latin/Greek/etymological root, provide { "root": "...", "meaning": "Vietnamese meaning of root", "origin": "Latin" | "Greek" | "French" | "Old English" }. Otherwise omit or set null.
5. "synonyms": 3 to 6 accurate English synonyms (especially TOEIC / business equivalents). Do NOT include "${trimmedText}" itself.
6. "antonyms": 2 to 4 accurate English antonyms (empty array [] if no natural antonym exists).
7. "wordFamily": Object with optional keys "noun", "verb", "adjective", "adverb" containing real English morphological relatives (omit keys that do not exist or match "${trimmedText}" identically; use "form1 / form2" if there are 2 common forms).
8. "collocations": 3 to 5 natural, high-frequency TOEIC / workplace collocations containing "${trimmedText}" (or its inflected form).
9. "relatedWords": 3 to 5 thematically related English words commonly appearing in the same TOEIC/business context.
10. "nodeNotes": An object mapping EVERY term listed in synonyms, antonyms, wordFamily, collocations, and relatedWords (using lowercase keys) to a concise Vietnamese meaning (3-8 words) so learners can click any node to understand it immediately.

Output strictly a single valid JSON object matching this schema:
{
  "coreConcept": "...",
  "ipa": "/.../",
  "partOfSpeech": "...",
  "rootInfo": { "root": "...", "meaning": "...", "origin": "Latin" },
  "synonyms": ["..."],
  "antonyms": ["..."],
  "wordFamily": { "noun": "...", "verb": "...", "adjective": "...", "adverb": "..." },
  "collocations": ["..."],
  "relatedWords": ["..."],
  "nodeNotes": { "example term": "nghĩa tiếng Việt ngắn gọn" }
}
Do NOT include markdown fences, backticks, or extra text outside the JSON object.`;

    const callGemini = async (): Promise<CustomVocabMindMapData | null> => {
      if (!canUseProvider('gemini') || !isGeminiConfigured()) return null;
      try {
        const rawText = await generateContentGemini({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            temperature: 0.35,
            responseMimeType: 'application/json',
          },
        });

        const parsed = safeParseJsonObject<RawCustomMindMapPayload>(rawText);
        if (parsed) {
          const normalized = normalizeCustomMindMapData(parsed, {
            centerWord: trimmedText,
            fallbackCoreConcept: explanation,
            fallbackIpa: ipa,
            fallbackPartOfSpeech: partOfSpeech,
            provider: 'gemini',
            model: getGeminiModel(),
          });
          if (hasAnyBranch(normalized)) {
            recordUserAIUsage({
              userId: effectiveUserId,
              userEmail: effectiveEmail,
              guestId: effectiveGuestId,
              provider: 'gemini',
            });
            return normalized;
          }
        }
      } catch (err) {
        console.warn('[CustomVocab MindMap] Gemini call failed:', err);
      }
      return null;
    };

    const callCloudflare = async (): Promise<CustomVocabMindMapData | null> => {
      if (!canUseProvider('cloudflare') || !isCloudflareChatConfigured()) return null;
      try {
        const rawText = await generateContentCloudflare(
          [{ role: 'user', content: prompt }],
          'You are an expert TOEIC lexicographer. Output strictly a valid raw JSON object.',
          { maxTokens: 1200, timeoutMs: 30000 }
        );

        const parsed = safeParseJsonObject<RawCustomMindMapPayload>(rawText);
        if (parsed) {
          const normalized = normalizeCustomMindMapData(parsed, {
            centerWord: trimmedText,
            fallbackCoreConcept: explanation,
            fallbackIpa: ipa,
            fallbackPartOfSpeech: partOfSpeech,
            provider: 'cloudflare',
            model: getCloudflareChatModel(),
          });
          if (hasAnyBranch(normalized)) {
            recordUserAIUsage({
              userId: effectiveUserId,
              userEmail: effectiveEmail,
              guestId: effectiveGuestId,
              provider: 'cloudflare',
            });
            return normalized;
          }
        }
      } catch (err) {
        console.warn('[CustomVocab MindMap] Cloudflare call failed:', err);
      }
      return null;
    };

    const geminiMindMap = await callGemini();
    if (geminiMindMap) {
      return NextResponse.json({
        success: true,
        mindMap: geminiMindMap,
        provider: 'gemini',
        model: geminiMindMap.model,
        isFallback: false,
      });
    }

    const cfMindMap = await callCloudflare();
    if (cfMindMap) {
      return NextResponse.json({
        success: true,
        mindMap: cfMindMap,
        provider: 'cloudflare',
        model: cfMindMap.model,
        isFallback: true,
        fallbackReason: 'Đã tự động chuyển sang mô hình Cloudflare Workers AI dự phòng.',
      });
    }

    const fallbackMindMap = await generateSmartMindMapFallback({
      text: trimmedText,
      explanation,
      ipa,
      partOfSpeech,
    });

    return NextResponse.json({
      success: true,
      mindMap: fallbackMindMap,
      provider: 'fallback',
      isFallback: true,
      fallbackReason:
        'Các dịch vụ AI trực tuyến tạm thời bận, hệ thống đã tạo Mind Map từ dữ liệu từ điển dự phòng.',
    });
  } catch (error: unknown) {
    console.error('API /api/custom-vocab/mind-map error:', error);
    return NextResponse.json(
      { error: 'Không thể tạo Vocab Mind Map lúc này. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
