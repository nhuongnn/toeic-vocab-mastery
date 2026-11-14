import { NextResponse } from 'next/server';

// In-memory cache to avoid redundant API requests
const translationCache = new Map<string, string>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawText = searchParams.get('text');
  const from = searchParams.get('from') || 'en';
  const to = searchParams.get('to') || 'vi';

  if (!rawText || !rawText.trim()) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  const text = rawText.trim().slice(0, 1000);
  const cacheKey = `${from}:${to}:${text.toLowerCase()}`;

  // Check memory cache
  if (translationCache.has(cacheKey)) {
    return NextResponse.json({
      originalText: text,
      translatedText: translationCache.get(cacheKey),
      cached: true,
    });
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ToeicVocabMastery/1.0)',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Translation API returned status: ${res.status}`);
    }

    const data = await res.json();
    let translated = data?.responseData?.translatedText;

    if (!translated || data.responseStatus !== 200) {
      // Check alternative matches if responseData translation is empty
      if (Array.isArray(data?.matches) && data.matches.length > 0) {
        translated = data.matches[0].translation;
      }
    }

    if (!translated) {
      throw new Error('Translation not available');
    }

    // Clean up HTML entities if returned (e.g. &#39; -> ')
    translated = translated
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    // Store in cache (limit cache size to 2000 entries)
    if (translationCache.size > 2000) {
      const firstKey = translationCache.keys().next().value;
      if (firstKey) translationCache.delete(firstKey);
    }
    translationCache.set(cacheKey, translated);

    return NextResponse.json({
      originalText: text,
      translatedText: translated,
      cached: false,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate content', originalText: text },
      { status: 500 }
    );
  }
}
