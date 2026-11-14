import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  if (!word) {
    return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim().toLowerCase())}`,
      { next: { revalidate: 86400 } } // Cache 24 hours
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Word not found in dictionary' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dictionary API error:', error);
    return NextResponse.json({ error: 'Failed to fetch from dictionary' }, { status: 500 });
  }
}
