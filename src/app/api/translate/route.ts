import { NextResponse } from 'next/server';
import { translateTextServer } from '@/lib/translate-server';
import { MAX_TRANSLATE_TEXT_LENGTH } from '@/lib/translate-models';

function parseBoolParam(val?: string | boolean | null): boolean {
  if (typeof val === 'boolean') return val;
  if (!val) return false;
  const s = val.trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes';
}

async function handleTranslateRequest(params: {
  rawText?: string | null;
  from?: string | null;
  to?: string | null;
  provider?: string | null;
  geminiModel?: string | null;
  cloudflareModel?: string | null;
  skipCache?: boolean;
  retries?: number;
  userId?: string | null;
  userEmail?: string | null;
  guestId?: string | null;
}) {
  const {
    rawText,
    from,
    to,
    provider,
    geminiModel,
    cloudflareModel,
    skipCache,
    retries,
    userId,
    userEmail,
    guestId,
  } = params;

  if (!rawText || !rawText.trim()) {
    return NextResponse.json(
      { error: 'Text parameter is required' },
      { status: 400 }
    );
  }

  try {
    const result = await translateTextServer({
      text: rawText,
      from: from || 'en',
      to: to || 'vi',
      provider,
      geminiModel,
      cloudflareModel,
      skipCache,
      retries,
      userId,
      userEmail,
      guestId,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to translate content',
        originalText: rawText.trim().slice(0, MAX_TRANSLATE_TEXT_LENGTH),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const retriesParam = Number(searchParams.get('retries'));
  return handleTranslateRequest({
    rawText: searchParams.get('text'),
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    provider:
      searchParams.get('provider') ||
      request.headers.get('x-translation-provider'),
    geminiModel:
      searchParams.get('geminiModel') ||
      request.headers.get('x-translation-gemini-model'),
    cloudflareModel:
      searchParams.get('cloudflareModel') ||
      request.headers.get('x-translation-cloudflare-model'),
    skipCache: parseBoolParam(searchParams.get('skipCache')),
    retries: Number.isFinite(retriesParam) && retriesParam > 0 ? retriesParam : undefined,
    userId: searchParams.get('userId') || request.headers.get('x-user-id'),
    userEmail:
      searchParams.get('userEmail') || request.headers.get('x-user-email'),
    guestId: searchParams.get('guestId') || request.headers.get('x-guest-id'),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      text?: string;
      from?: string;
      to?: string;
      targetLang?: string;
      provider?: string;
      geminiModel?: string;
      cloudflareModel?: string;
      skipCache?: boolean;
      retries?: number;
      userId?: string;
      userEmail?: string;
      guestId?: string;
    };

    return handleTranslateRequest({
      rawText: body.text,
      from: body.from,
      to: body.to || body.targetLang,
      provider: body.provider || request.headers.get('x-translation-provider'),
      geminiModel:
        body.geminiModel || request.headers.get('x-translation-gemini-model'),
      cloudflareModel:
        body.cloudflareModel ||
        request.headers.get('x-translation-cloudflare-model'),
      skipCache: parseBoolParam(body.skipCache),
      retries:
        typeof body.retries === 'number' && body.retries > 0
          ? body.retries
          : undefined,
      userId: body.userId || request.headers.get('x-user-id'),
      userEmail: body.userEmail || request.headers.get('x-user-email'),
      guestId: body.guestId || request.headers.get('x-guest-id'),
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body' },
      { status: 400 }
    );
  }
}
