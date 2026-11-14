import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word') || '';
  const query = searchParams.get('query') || word || 'business';
  const description = searchParams.get('description') || '';
  const style = searchParams.get('style') || '3d';
  const refresh = searchParams.get('refresh') === 'true';

  // 1. Core visual scene description is the primary anchor of the prompt
  const scenePrompt = description || query || word;

  let styleModifier = '';
  if (style === 'realistic') {
    styleModifier =
      'Award-winning documentary editorial photography, realistic workplace and daily life setting, natural cinematic lighting, 35mm lens, sharp focus, 8k resolution, no text, no watermark, no blur';
  } else {
    // Default: 3D Conceptual Anchor
    styleModifier =
      'Crisp 3D isometric conceptual illustration, educational visual anchor, Pixar Blender clay style, clean studio rim lighting, vibrant colors, shallow depth of field, 8k render, no text, no letters, no watermark';
  }

  const fullPrompt = `${scenePrompt}. ${styleModifier}`;

  // Deterministic seed based on word + style so it remains consistent per word per style,
  // or random seed if user clicks "Đổi ảnh" (refresh=true)
  const seed = refresh
    ? Math.floor(Math.random() * 1000000)
    : Math.abs(
        `${word}-${style}`.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0) % 1000000
      );

  const polliKey = process.env.POLLINATIONS_API_KEY;

  let aiImageUrl: string;
  if (polliKey) {
    // Official Authenticated API endpoint with API Key (ultra-fast FLUX.1-schnell, no logo, no IP throttling)
    aiImageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(
      fullPrompt
    )}?width=800&height=450&seed=${seed}&model=black-forest-labs/flux.1-schnell&key=${polliKey}`;
  } else {
    // Fallback anonymous FLUX endpoint
    aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      fullPrompt
    )}?width=800&height=450&nologo=true&seed=${seed}&model=flux`;
  }

  return NextResponse.json({
    results: [
      {
        id: `flux-${word}-${style}-${seed}`,
        urls: {
          regular: aiImageUrl,
          small: aiImageUrl,
        },
        alt_description: description || `Visual illustration of ${word}`,
        user: {
          name: style === 'realistic' ? 'AI Realistic Photography (FLUX)' : 'AI 3D Conceptual Anchor (FLUX)',
          links: { html: 'https://pollinations.ai' },
        },
        style,
        seed,
      },
    ],
  });
}
