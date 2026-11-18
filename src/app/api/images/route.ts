import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isCloudflareAiConfigured } from '@/lib/cloudflare-ai';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word') || '';
  const query = searchParams.get('query') || word || 'business';
  const description = searchParams.get('description') || '';
  const style = searchParams.get('style') || '3d';
  const refresh = searchParams.get('refresh') === 'true';
  const fallbackUrl = searchParams.get('fallbackUrl') || '';

  const safeKey = `${word.toLowerCase().replace(/[^a-z0-9_-]/g, '_') || 'word'}-${style}`;
  const cacheDir = path.join(process.cwd(), 'public', 'cache', 'vocabulary');
  const cacheFilePath = path.join(cacheDir, `${safeKey}.png`);

  // Deterministic seed based on word + style or random seed if refresh
  const seed = refresh
    ? Math.floor(Math.random() * 1000000)
    : Math.abs(
        `${word}-${style}`.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0) % 1000000
      );

  let imageUrl: string;

  // 1. If not refresh and file is already cached on disk, serve as static asset
  if (!refresh && fs.existsSync(cacheFilePath)) {
    imageUrl = `/cache/vocabulary/${safeKey}.png`;
  } else {
    // 2. Delegate to render route handler which handles Cloudflare AI -> Fallbacks -> Caching
    const renderParams = new URLSearchParams({
      word,
      query,
      description,
      style,
      seed: String(seed),
      ...(refresh ? { refresh: 'true' } : {}),
      ...(fallbackUrl ? { fallbackUrl } : {}),
    });
    imageUrl = `/api/images/render?${renderParams.toString()}`;
  }

  const isCf = isCloudflareAiConfigured();
  const providerLabel = isCf
    ? style === '3d'
      ? 'Cloudflare Workers AI (FLUX / SDXL 3D)'
      : 'Cloudflare Workers AI (Realistic Photo)'
    : style === '3d'
    ? 'AI 3D Conceptual Anchor'
    : 'AI Realistic Photography';

  return NextResponse.json({
    results: [
      {
        id: `img-${word}-${style}-${seed}`,
        urls: {
          regular: imageUrl,
          small: imageUrl,
        },
        alt_description: description || `Visual illustration of ${word}`,
        user: {
          name: providerLabel,
          links: { html: isCf ? 'https://developers.cloudflare.com/workers-ai/' : 'https://toeic-mastery.app' },
        },
        style,
        seed,
        isCached: !refresh && fs.existsSync(cacheFilePath),
      },
    ],
  });
}
