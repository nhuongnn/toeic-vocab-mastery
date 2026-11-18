/**
 * Cloudflare Workers AI Integration for Text-to-Image Generation
 *
 * Supported Models:
 * - @cf/black-forest-labs/flux-1-schnell (Ultra-sharp 3D isometric conceptual illustrations)
 * - @cf/bytedance/stable-diffusion-xl-lightning (Lightning fast 1-second generation)
 * - @cf/stabilityai/stable-diffusion-xl-base-1.0 (Standard SDXL)
 */

export interface CloudflareImageOptions {
  model?: string;
  steps?: number;
  seed?: number;
  timeoutMs?: number;
}

export function isCloudflareAiConfigured(): boolean {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID?.trim() &&
    process.env.CLOUDFLARE_API_TOKEN?.trim()
  );
}

export function getCloudflareAiModel(): string {
  return (
    process.env.CLOUDFLARE_AI_MODEL?.trim() ||
    '@cf/black-forest-labs/flux-1-schnell'
  );
}

export async function generateCloudflareImage(
  prompt: string,
  options: CloudflareImageOptions = {}
): Promise<Buffer> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare Workers AI credentials missing (CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN).');
  }

  const model = options.model || getCloudflareAiModel();
  const timeoutMs = options.timeoutMs || 25000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  // Formulate body strictly according to each model's schema
  const isFlux = model.toLowerCase().includes('flux');
  const bodyPayload: Record<string, unknown> = {
    prompt,
  };

  if (isFlux) {
    // Cloudflare FLUX strictly allows only 'prompt' and 'steps' (1-8).
    // Including 'seed' or 'num_steps' triggers HTTP 400 (AiError code 5006).
    bodyPayload.steps = Math.min(Math.max(options.steps || 4, 1), 8);
  } else {
    // SDXL / Lightning models accept 'num_steps' and 'seed'
    bodyPayload.num_steps = options.steps || 4;
    if (options.seed !== undefined && options.seed !== null) {
      bodyPayload.seed = options.seed;
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errDetails = '';
      try {
        const errJson = await res.json();
        errDetails = JSON.stringify(errJson.errors || errJson.messages || errJson);
      } catch {
        errDetails = await res.text().catch(() => res.statusText);
      }
      throw new Error(`Cloudflare Workers AI HTTP ${res.status}: ${errDetails}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      // Sometimes Cloudflare responds with JSON containing { result: { image: base64 } }
      const data = await res.json();
      if (data.result?.image) {
        return Buffer.from(data.result.image, 'base64');
      }
      throw new Error(`Cloudflare AI unexpected JSON response: ${JSON.stringify(data).slice(0, 150)}`);
    }

    // Binary image response
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Cloudflare Workers AI timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}
