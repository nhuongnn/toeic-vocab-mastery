import { NextResponse } from 'next/server';
import { isGeminiConfigured, getGeminiModel, generateContentGemini } from '@/lib/ai/gemini-provider';
import { isCloudflareChatConfigured, getCloudflareChatModel, streamCloudflare } from '@/lib/ai/cloudflare-provider';
import { canUseProvider, checkUserAIQuota, recordUserAIUsage } from '@/lib/ai/system-ai-settings';
import { CustomItemType } from '@/types/custom-vocab';

interface RequestBody {
  text: string;
  type?: CustomItemType;
  field?: 'all' | 'explanation' | 'context';
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

// Fallback generator when AI services are offline or quota exhausted
async function generateSmartFallback(
  text: string,
  preferredType?: CustomItemType
): Promise<{ type: CustomItemType; explanation: string; context: string }> {
  const trimmed = text.trim();
  const wordCount = trimmed.split(/\s+/).length;
  const inferredType: CustomItemType =
    preferredType || (wordCount > 3 || /^(if|when|should|please|we|i|in order|as soon|would|could)/i.test(trimmed) ? 'pattern' : 'vocabulary');

  let translatedMeaning = '';
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|vi`,
      { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      translatedMeaning = data?.responseData?.translatedText || '';
    }
  } catch {
    // ignore
  }

  const cleanTranslation = translatedMeaning
    ? translatedMeaning.replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    : 'Nghĩa của từ / mẫu câu trong ngữ cảnh công sở.';

  if (inferredType === 'vocabulary') {
    return {
      type: 'vocabulary',
      explanation: `${cleanTranslation}\n• Phân loại: Từ vựng TOEIC thường gặp.\n• Lưu ý: Thường xuất hiện trong các bài đọc thông báo, email hoặc giao dịch thương mại.`,
      context: `The department announced that "${trimmed}" will be implemented in the upcoming project phase.\n(Bộ phận đã thông báo rằng việc áp dụng này sẽ được triển khai trong giai đoạn dự án sắp tới.)`,
    };
  }

  return {
    type: 'pattern',
    explanation: `${cleanTranslation}\n• Phân loại: Mẫu câu giao tiếp & soạn thảo văn bản.\n• Cấu trúc thường dùng trong thư từ thương mại hoặc đàm phán công việc.`,
    context: `Please be reminded that "${trimmed}" to ensure operational efficiency.\n(Xin vui lòng lưu ý cấu trúc này nhằm đảm bảo hiệu quả vận hành công việc.)`,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { text, type, field = 'all', userId, userEmail, guestId } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp từ vựng hoặc mẫu câu (text)' },
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
      const fallback = await generateSmartFallback(trimmedText, type);
      return NextResponse.json({
        success: true,
        type: fallback.type,
        explanation: fallback.explanation,
        context: fallback.context,
        provider: 'fallback',
        isFallback: true,
        fallbackReason: quotaCheck.reason || 'Hạn mức AI hôm nay đã đạt giới hạn.',
      });
    }

    // 2. Build targeted prompt
    const prompt = `You are a professional Business English & TOEIC exam specialist.
Analyze the following English text and provide a concise, high-value learning entry for a learner's personal vocabulary/pattern notebook.

English Text: "${trimmedText}"
User Specified Type: ${type ? `"${type}"` : 'Auto-detect whether this is "vocabulary" (word, compound noun, phrasal verb) or "pattern" (sentence pattern, grammatical structure, email formula)'}
Requested Field: "${field}"

Requirements:
1. "type": Must be either "vocabulary" or "pattern".
2. "explanation":
   - Provide a natural Vietnamese explanation specifically tailored for TOEIC & workplace communication.
   - For vocabulary: mention part of speech, core workplace meaning, and practical collocations or synonyms.
   - For pattern: explain the structure/formula, communicative purpose (e.g. polite inquiry, confirmation, declining an offer), and formality level.
3. "context":
   - 1-2 realistic corporate / business sentences using this exact text naturally (e.g., from emails, memos, customer inquiries, meetings, or contract negotiations).
   - Follow each sentence with its accurate, natural Vietnamese translation in parentheses.
   - Highlight or quote the keyword/pattern in the sentence.

Output strictly a single valid JSON object with the following schema:
{
  "type": "vocabulary" | "pattern",
  "explanation": "Chi tiết giải thích bằng tiếng Việt...",
  "context": "Ví dụ thực tế tiếng Anh\\n(Bản dịch tiếng Việt...)"
}
Do NOT include markdown fences, backticks, or explanatory text outside the JSON object.`;

    // 3. Helper: call Gemini
    const callGemini = async (): Promise<{ type: CustomItemType; explanation: string; context: string } | null> => {
      if (!canUseProvider('gemini') || !isGeminiConfigured()) return null;
      try {
        const rawText = await generateContentGemini({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            temperature: 0.3,
            responseMimeType: 'application/json',
          },
        });

        if (rawText) {
          const parsed = safeParseJsonObject<{ type?: string; explanation?: string; context?: string }>(rawText);
          if (parsed && (parsed.explanation || parsed.context)) {
            recordUserAIUsage({
              userId: effectiveUserId,
              userEmail: effectiveEmail,
              guestId: effectiveGuestId,
              provider: 'gemini',
            });
            return {
              type: parsed.type === 'pattern' ? 'pattern' : 'vocabulary',
              explanation: parsed.explanation || '',
              context: parsed.context || '',
            };
          }
        }
      } catch (err) {
        console.warn('[CustomVocab AI Assist] Gemini call failed:', err);
      }
      return null;
    };

    // 4. Helper: call Cloudflare
    const callCloudflare = async (): Promise<{ type: CustomItemType; explanation: string; context: string } | null> => {
      if (!canUseProvider('cloudflare') || !isCloudflareChatConfigured()) return null;
      try {
        let accumulated = '';
        for await (const chunk of streamCloudflare(
          [{ role: 'user', content: prompt }],
          'You are an expert TOEIC tutor. Output strictly a valid raw JSON object.'
        )) {
          accumulated += chunk;
        }

        const parsed = safeParseJsonObject<{ type?: string; explanation?: string; context?: string }>(accumulated);
        if (parsed && (parsed.explanation || parsed.context)) {
          recordUserAIUsage({
            userId: effectiveUserId,
            userEmail: effectiveEmail,
            guestId: effectiveGuestId,
            provider: 'cloudflare',
          });
          return {
            type: parsed.type === 'pattern' ? 'pattern' : 'vocabulary',
            explanation: parsed.explanation || '',
            context: parsed.context || '',
          };
        }
      } catch (err) {
        console.warn('[CustomVocab AI Assist] Cloudflare call failed:', err);
      }
      return null;
    };

    // Try Gemini first
    const geminiResult = await callGemini();
    if (geminiResult) {
      return NextResponse.json({
        success: true,
        type: type || geminiResult.type,
        explanation: geminiResult.explanation,
        context: geminiResult.context,
        provider: 'gemini',
        model: getGeminiModel(),
        isFallback: false,
      });
    }

    // Fallback to Cloudflare
    const cfResult = await callCloudflare();
    if (cfResult) {
      return NextResponse.json({
        success: true,
        type: type || cfResult.type,
        explanation: cfResult.explanation,
        context: cfResult.context,
        provider: 'cloudflare',
        model: getCloudflareChatModel(),
        isFallback: true,
        fallbackReason: 'Đã tự động chuyển sang mô hình Cloudflare Workers AI dự phòng.',
      });
    }

    // Fallback to smart local template
    const fallback = await generateSmartFallback(trimmedText, type);
    return NextResponse.json({
      success: true,
      type: fallback.type,
      explanation: fallback.explanation,
      context: fallback.context,
      provider: 'fallback',
      isFallback: true,
      fallbackReason: 'Các dịch vụ AI trực tuyến tạm thời bận, hệ thống đã tạo mẫu hỗ trợ tự động.',
    });
  } catch (error: unknown) {
    console.error('API /api/custom-vocab/ai-assist error:', error);
    const fallback = await generateSmartFallback('workplace communication');
    return NextResponse.json(
      {
        success: true,
        type: fallback.type,
        explanation: fallback.explanation,
        context: fallback.context,
        provider: 'fallback',
        isFallback: true,
        fallbackReason: 'Lỗi xử lý, đã tạo gợi ý dự phòng.',
      },
      { status: 200 }
    );
  }
}
