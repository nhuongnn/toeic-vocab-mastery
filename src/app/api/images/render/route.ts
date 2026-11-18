import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isCloudflareAiConfigured, generateCloudflareImage } from '@/lib/cloudflare-ai';

function getMimeType(buffer: Buffer | Uint8Array): string {
  if (buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (buffer.length > 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image/png';
  }
  if (buffer.length > 3 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    return 'image/webp';
  }
  return 'image/jpeg';
}

function safeReadCache(filePath: string): Buffer | null {
  try {
    if (fs.existsSync(filePath)) {
      const cached = fs.readFileSync(filePath);
      if (cached.length > 1000) return cached;
    }
  } catch {
    // Non-fatal
  }
  return null;
}

function safeWriteCache(filePath: string, dir: string, buffer: Buffer): void {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    // Non-fatal: on serverless platforms (e.g. Vercel), local write errors
    // must never block image delivery. Vercel Edge CDN caches via s-maxage header.
    console.warn('[Cache Info] Local disk write skipped:', err instanceof Error ? err.message : err);
  }
}

function generateSvgPlaceholder(word: string, description: string, style: string): string {
  const safeWord = word.replace(/[<>&"]/g, '');
  const safeDesc = description.slice(0, 120).replace(/[<>&"]/g, '');
  const is3d = style === '3d';
  const gradStart = is3d ? '#1e1b4b' : '#0f172a';
  const gradEnd = is3d ? '#311042' : '#1e293b';
  const accentColor = is3d ? '#f59e0b' : '#6366f1';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="800" height="450" rx="16" fill="url(#bg)"/>
  <circle cx="400" cy="180" r="70" fill="${accentColor}" fill-opacity="0.15" />
  <circle cx="400" cy="180" r="50" fill="${accentColor}" fill-opacity="0.25" />
  <text x="400" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="bold" fill="${accentColor}" text-anchor="middle" filter="url(#shadow)">
    ${safeWord.toUpperCase()}
  </text>
  <text x="400" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1.5">
    VISUAL CONCEPTUAL ANCHOR
  </text>
  <text x="400" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle" max-width="600">
    ${safeDesc ? `"${safeDesc}..."` : 'Visual association anchor for memory retention'}
  </text>
</svg>`.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word') || 'visual';
  const query = searchParams.get('query') || word || 'business';
  const description = searchParams.get('description') || '';
  const style = searchParams.get('style') || '3d';
  const refresh = searchParams.get('refresh') === 'true';
  const fallbackUrl = searchParams.get('fallbackUrl') || '';
  const seed = searchParams.get('seed') ? parseInt(searchParams.get('seed')!, 10) : 42;

  // On Vercel / AWS Lambda, process.cwd() is read-only (/var/task). Use /tmp instead.
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const cacheDir = isServerless
    ? path.join('/tmp', 'cache', 'vocabulary')
    : path.join(process.cwd(), 'public', 'cache', 'vocabulary');

  const safeKey = `${word.toLowerCase().replace(/[^a-z0-9_-]/g, '_') || 'word'}-${style}`;
  const cacheFilePath = path.join(cacheDir, `${safeKey}.png`);

  // 1. Return from disk/tmp cache if already generated and not forced refresh
  if (!refresh) {
    const cachedBuffer = safeReadCache(cacheFilePath);
    if (cachedBuffer) {
      return new NextResponse(new Uint8Array(cachedBuffer), {
        headers: {
          'Content-Type': getMimeType(cachedBuffer),
          'Cache-Control': 'public, s-maxage=31536000, max-age=31536000, stale-while-revalidate=86400, immutable',
          'X-Image-Source': isServerless ? 'vercel-tmp-cache' : 'local-disk-cache',
        },
      });
    }
  }

  // 2. Build AI prompt
  const scenePrompt = description || query || word;
  const styleModifier =
    style === 'realistic'
      ? 'Award-winning documentary editorial photography, realistic workplace and daily life setting, natural cinematic lighting, 35mm lens, sharp focus, 8k resolution, no text, no watermark, no blur'
      : 'Crisp 3D isometric conceptual illustration, educational visual anchor, Pixar Blender clay style, clean studio rim lighting, vibrant colors, shallow depth of field, 8k render, no text, no letters, no watermark';

  const fullPrompt = `${scenePrompt}. ${styleModifier}`;

  // 3. Attempt: Cloudflare Workers AI
  if (isCloudflareAiConfigured()) {
    try {
      const buffer = await generateCloudflareImage(fullPrompt, {
        seed,
        steps: 4,
        timeoutMs: 20000,
      });

      if (buffer && buffer.length > 1000) {
        // Save to cache safely (non-blocking)
        safeWriteCache(cacheFilePath, cacheDir, buffer);

        return new NextResponse(new Uint8Array(buffer), {
          headers: {
            'Content-Type': getMimeType(buffer),
            'Cache-Control': refresh
              ? 'no-cache, no-store, must-revalidate'
              : 'public, s-maxage=31536000, max-age=31536000, stale-while-revalidate=86400, immutable',
            'X-Image-Source': 'cloudflare-workers-ai',
          },
        });
      }
    } catch (cfErr) {
      console.error('[Cloudflare Workers AI Error]:', cfErr instanceof Error ? cfErr.message : cfErr);
    }
  }

  // 4. Attempt: Pollinations Turbo fallback (Fast free model without expired key)
  try {
    const turboUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      fullPrompt
    )}?width=800&height=450&nologo=true&seed=${seed}&model=turbo`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const polliRes = await fetch(turboUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ToeicVocabMastery/1.0' },
    });
    clearTimeout(timeout);

    if (polliRes.ok) {
      const arrayBuffer = await polliRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length > 1000) {
        safeWriteCache(cacheFilePath, cacheDir, buffer);

        return new NextResponse(new Uint8Array(buffer), {
          headers: {
            'Content-Type': polliRes.headers.get('content-type') || 'image/jpeg',
            'Cache-Control': 'public, s-maxage=86400, max-age=86400',
            'X-Image-Source': 'pollinations-turbo-fallback',
          },
        });
      }
    }
  } catch (polliErr) {
    console.warn('[Pollinations Fallback Warning]:', polliErr instanceof Error ? polliErr.message : polliErr);
  }

  // 5. Attempt: Fallback URL if provided (Reference visual from vocabulary data)
  if (fallbackUrl && fallbackUrl.startsWith('http')) {
    return NextResponse.redirect(fallbackUrl, 307);
  }

  // 6. Final safety: High-quality SVG Visual Anchor
  const svg = generateSvgPlaceholder(word, description, style);
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'X-Image-Source': 'svg-conceptual-anchor',
    },
  });
}
