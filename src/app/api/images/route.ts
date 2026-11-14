import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word') || '';
  const query = searchParams.get('query') || word || 'business';
  const description = searchParams.get('description') || '';
  const refresh = searchParams.get('refresh') === 'true';

  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  const pexelsKey = process.env.PEXELS_API_KEY;

  // 1. Try Unsplash if API key is provided
  if (unsplashKey) {
    try {
      const searchTerm = word || query.split(' ').slice(0, 2).join(' ');
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          searchTerm
        )}&per_page=3&orientation=landscape`,
        {
          headers: { Authorization: `Client-ID ${unsplashKey}` },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return NextResponse.json(data);
        }
      }
    } catch (e) {
      console.warn('Unsplash search failed, falling back to AI visual:', e);
    }
  }

  // 2. Try Pexels if API key is provided
  if (pexelsKey) {
    try {
      const searchTerm = word || query.split(' ').slice(0, 2).join(' ');
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=3`,
        {
          headers: { Authorization: pexelsKey },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          return NextResponse.json({
            results: data.photos.map((p: any) => ({
              id: String(p.id),
              urls: { regular: p.src.large2x || p.src.large, small: p.src.medium },
              alt_description: p.alt || word,
              user: { name: p.photographer, links: { html: p.photographer_url } },
            })),
          });
        }
      }
    } catch (e) {
      console.warn('Pexels search failed, falling back:', e);
    }
  }

  // 3. High-quality AI contextual illustration tailored specifically to the vocabulary word
  const cleanKeyword = query.replace(/[^\w\s-]/g, '').slice(0, 80);
  const promptParts = [
    word ? `English vocabulary word "${word}"` : '',
    cleanKeyword,
    'high quality educational photography, clear workplace and real life context'
  ].filter(Boolean);

  const prompt = promptParts.join(', ');

  // Deterministic seed based on word string so image remains consistent per word,
  // or random seed if the user clicks "Làm mới ảnh" (refresh=true)
  const seed = refresh
    ? Math.floor(Math.random() * 100000)
    : Math.abs(
        (word || query).split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0) % 100000
      );

  const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&nologo=true&seed=${seed}`;

  return NextResponse.json({
    results: [
      {
        id: `ai-${word || 'vocab'}-${seed}`,
        urls: {
          regular: aiImageUrl,
          small: aiImageUrl,
        },
        alt_description: description || `Visual illustration of ${word}`,
        user: {
          name: 'AI Contextual Illustration',
          links: { html: 'https://pollinations.ai' },
        },
      },
    ],
  });
}
