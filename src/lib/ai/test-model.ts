import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey, getGeminiModel, FALLBACK_GEMINI_MODELS } from './gemini-provider';
import { getCloudflareChatModel } from './cloudflare-provider';

export interface ModelTestAttempt {
  attemptNumber: number;
  success: boolean;
  durationMs: number;
  timestamp: string;
  error?: string;
  responseSnippet?: string;
}

export interface ModelTestResult {
  provider: 'gemini' | 'cloudflare';
  model: string;
  success: boolean;
  attemptsCount: number;
  maxRetries: number;
  succeededAtAttempt?: number;
  totalDurationMs: number;
  responseSnippet?: string;
  attempts: ModelTestAttempt[];
  error?: string;
}

export const POPULAR_GEMINI_MODELS = [
  { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite Latest (Primary)', note: 'Nhanh nhất, ổn định nhất' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', note: 'Thế hệ mới siêu tốc' },
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', note: 'Model Flash tiêu chuẩn' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', note: 'Chất lượng cao' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite', note: 'Bản rút gọn tiết kiệm' },
];

export const POPULAR_CLOUDFLARE_MODELS = [
  { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct (Default)', note: 'Phổ biến và ổn định nhất trên CF' },
  { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 8B Instruct', note: 'Bản Llama 3 tiêu chuẩn' },
  { id: '@cf/mistral/mistral-7b-instruct-v0.1', name: 'Mistral 7B Instruct v0.1', note: 'Tốc độ phản hồi cao' },
  { id: '@cf/qwen/qwen1.5-7b-chat', name: 'Qwen 1.5 7B Chat', note: 'Tối ưu đa ngôn ngữ' },
  { id: '@cf/google/gemma-7b-it', name: 'Gemma 7B IT', note: 'Model Gemma của Google trên CF' },
];

/**
 * Execute a test call against an AI model with up to `maxRetries` attempts (default: 5).
 */
export async function testAIModel(options: {
  provider: 'gemini' | 'cloudflare';
  model?: string;
  prompt?: string;
  maxRetries?: number;
}): Promise<ModelTestResult> {
  const { provider } = options;
  const maxRetries = options.maxRetries && options.maxRetries > 0 ? options.maxRetries : 5;
  const testPrompt =
    options.prompt?.trim() ||
    'Hello! System health check: please respond with "AI OK" and confirm you are operational in under 15 words.';

  let modelName = options.model?.trim();
  if (!modelName) {
    modelName = provider === 'gemini' ? getGeminiModel() : getCloudflareChatModel();
  }

  const attempts: ModelTestAttempt[] = [];
  const testStartTime = Date.now();
  let succeeded = false;
  let succeededAt = 0;
  let finalSnippet = '';
  let lastErrorMessage = '';

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const attemptStart = Date.now();
    try {
      let snippet = '';

      if (provider === 'gemini') {
        const apiKey = getGeminiApiKey();
        const ai = new GoogleGenAI({ apiKey });

        let cleanModel = modelName;
        if (cleanModel.startsWith('models/')) {
          cleanModel = cleanModel.replace(/^models\//, '');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 18000);

        try {
          const res = await ai.models.generateContent({
            model: cleanModel,
            contents: testPrompt,
          });
          snippet = res.text?.trim() || '';
        } finally {
          clearTimeout(timeoutId);
        }

        if (!snippet) {
          throw new Error('Mô hình trả về nội dung rỗng (empty text output).');
        }
      } else {
        // Cloudflare
        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
        const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

        if (!accountId || !apiToken) {
          throw new Error(
            'Thông tin xác thực Cloudflare Workers AI chưa được cấu hình (CLOUDFLARE_ACCOUNT_ID hoặc CLOUDFLARE_API_TOKEN thiếu).'
          );
        }

        const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${modelName}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 18000);

        let res: Response;
        try {
          res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: testPrompt }],
              max_tokens: 100,
            }),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeoutId);
        }

        if (!res.ok) {
          let errDetails = '';
          try {
            const errJson = await res.json();
            errDetails = JSON.stringify(errJson.errors || errJson.messages || errJson);
          } catch {
            errDetails = await res.text().catch(() => res.statusText);
          }
          throw new Error(`Cloudflare HTTP ${res.status}: ${errDetails}`);
        }

        const data = await res.json();
        snippet =
          data.result?.response?.trim() ||
          (typeof data.result === 'string' ? data.result : JSON.stringify(data.result));

        if (!snippet) {
          throw new Error('Cloudflare trả về kết quả rỗng.');
        }
      }

      const durationMs = Date.now() - attemptStart;
      attempts.push({
        attemptNumber: attempt,
        success: true,
        durationMs,
        timestamp: new Date().toISOString(),
        responseSnippet: snippet,
      });

      succeeded = true;
      succeededAt = attempt;
      finalSnippet = snippet;
      break; // Success! No need to retry further
    } catch (err: unknown) {
      const durationMs = Date.now() - attemptStart;
      const errMsg = err instanceof Error ? err.message : String(err);
      lastErrorMessage = errMsg;

      attempts.push({
        attemptNumber: attempt,
        success: false,
        durationMs,
        timestamp: new Date().toISOString(),
        error: errMsg,
      });

      console.warn(
        `[AI Model Test] Attempt ${attempt}/${maxRetries} for ${provider}:${modelName} failed (${durationMs}ms): ${errMsg}`
      );

      // If we haven't reached maxRetries yet, wait a short backoff before retrying
      if (attempt < maxRetries) {
        const backoffMs = Math.min(800 * attempt, 2500);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    }
  }

  const totalDurationMs = Date.now() - testStartTime;

  return {
    provider,
    model: modelName,
    success: succeeded,
    attemptsCount: attempts.length,
    maxRetries,
    succeededAtAttempt: succeeded ? succeededAt : undefined,
    totalDurationMs,
    responseSnippet: succeeded ? finalSnippet : undefined,
    attempts,
    error: succeeded ? undefined : lastErrorMessage,
  };
}
