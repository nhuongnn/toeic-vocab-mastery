import { ChatMessage } from './types';

export function isCloudflareChatConfigured(): boolean {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID?.trim() &&
    process.env.CLOUDFLARE_API_TOKEN?.trim()
  );
}

export function getCloudflareChatModel(): string {
  return (
    process.env.CLOUDFLARE_CHAT_MODEL?.trim() ||
    '@cf/meta/llama-3.1-8b-instruct'
  );
}

/**
 * Non-streaming text generation from Cloudflare Workers AI
 */
export async function generateContentCloudflare(
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>,
  systemPrompt: string,
  options?: { maxTokens?: number; timeoutMs?: number }
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare Workers AI credentials missing (CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN).');
  }

  const model = getCloudflareChatModel();
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  const payloadMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((m) => m.role !== 'system' && m.content?.trim())
      .map((m) => ({
        role: m.role,
        content: m.content.trim(),
      })),
  ];

  const timeoutMs = options?.timeoutMs ?? 25000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: payloadMessages,
        stream: false,
        max_tokens: options?.maxTokens ?? 1000,
      }),
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

    const data = await res.json();
    const text =
      data?.result?.response?.trim() ||
      data?.choices?.[0]?.message?.content?.trim() ||
      (typeof data?.result === 'string' ? data.result.trim() : '');

    if (!text) {
      throw new Error('Cloudflare Workers AI returned empty response');
    }

    return text;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Cloudflare Workers AI request timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Cloudflare AI Error: ${msg}`);
  }
}

/**
 * Stream responses from Cloudflare Workers AI Text Generation
 */
export async function* streamCloudflare(
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>,
  systemPrompt: string
): AsyncGenerator<string, void, unknown> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare Workers AI credentials missing (CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN).');
  }

  const model = getCloudflareChatModel();
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  // Build messages array with system prompt first
  const payloadMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((m) => m.role !== 'system' && m.content?.trim())
      .map((m) => ({
        role: m.role,
        content: m.content.trim(),
      })),
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: payloadMessages,
        stream: true,
        max_tokens: 1500,
      }),
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

    if (!res.body) {
      throw new Error('Cloudflare AI response body is empty');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const dataStr = trimmed.slice(5).trim();
        if (dataStr === '[DONE]') {
          return;
        }

        try {
          const parsed = JSON.parse(dataStr);
          // Handle both Cloudflare standard response and OpenAI-compatible chunk format
          const rawChunk =
            parsed.choices?.[0]?.delta?.content !== undefined
              ? parsed.choices[0].delta.content
              : parsed.response;

          if (rawChunk !== undefined && rawChunk !== null) {
            const text = String(rawChunk);
            if (text.length > 0) {
              yield text;
            }
          }
        } catch {
          // ignore JSON parse error on incomplete SSE chunks
        }
      }
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Cloudflare Workers AI request timed out after 35s');
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Cloudflare AI Error: ${msg}`);
  }
}
