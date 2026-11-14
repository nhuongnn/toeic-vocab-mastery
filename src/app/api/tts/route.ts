import { NextResponse } from 'next/server';

// In-memory cache for audio buffers (LRU-style capped at 1000 items)
const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();
const MAX_CACHE_SIZE = 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const accent = searchParams.get('accent') || 'en-US';

  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  // Normalize text (trim, remove double spaces)
  const cleanText = text.trim().replace(/\s+/g, ' ');
  const lang = accent === 'en-GB' ? 'en-GB' : accent === 'en-AU' ? 'en-AU' : 'en-US';
  const cacheKey = `${lang}:${cleanText}`;

  // Check cache
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    return new Response(new Uint8Array(cached.buffer), {
      status: 200,
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Audio-Source': 'cache',
      },
    });
  }

  // If text is short enough (<= 180 chars), single fetch
  if (cleanText.length <= 180) {
    try {
      const buffer = await fetchGoogleTTSChunk(cleanText, lang);
      saveToCache(cacheKey, buffer, 'audio/mpeg');

      return new Response(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          'X-Audio-Source': 'google-tts',
        },
      });
    } catch (err) {
      console.error('TTS single fetch error:', err);
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }
  }

  // If text is long (> 180 chars), split into chunks and concatenate MP3 buffers
  try {
    const chunks = splitTextIntoChunks(cleanText, 150);
    const chunkBuffers = await Promise.all(
      chunks.map((chunk) => fetchGoogleTTSChunk(chunk, lang))
    );
    const combinedBuffer = Buffer.concat(chunkBuffers);
    saveToCache(cacheKey, combinedBuffer, 'audio/mpeg');

    return new Response(new Uint8Array(combinedBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Audio-Source': 'google-tts-concatenated',
      },
    });
  } catch (err) {
    console.error('TTS multi-chunk fetch error:', err);
    return NextResponse.json({ error: 'Failed to generate audio chunks' }, { status: 500 });
  }
}

async function fetchGoogleTTSChunk(text: string, lang: string): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(
    text
  )}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: 'https://translate.google.com/',
    },
  });

  if (!res.ok) {
    throw new Error(`Google TTS returned HTTP ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function saveToCache(key: string, buffer: Buffer, contentType: string) {
  if (audioCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = audioCache.keys().next().value;
    if (oldestKey) audioCache.delete(oldestKey);
  }
  audioCache.set(key, { buffer, contentType });
}

function splitTextIntoChunks(text: string, maxChunkLength: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length + 1 <= maxChunkLength) {
      currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (trimmed.length > maxChunkLength) {
        // Fallback for extremely long clauses without punctuation
        const words = trimmed.split(' ');
        let subChunk = '';
        for (const w of words) {
          if (subChunk.length + w.length + 1 <= maxChunkLength) {
            subChunk = subChunk ? `${subChunk} ${w}` : w;
          } else {
            if (subChunk) chunks.push(subChunk);
            subChunk = w;
          }
        }
        if (subChunk) currentChunk = subChunk;
      } else {
        currentChunk = trimmed;
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks.length > 0 ? chunks : [text];
}
