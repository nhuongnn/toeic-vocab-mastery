import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from './types';

export function isGeminiConfigured(): boolean {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
  return Boolean(key);
}

export function getGeminiModel(): string {
  let model = process.env.GEMINI_MODEL?.trim() || '';
  if (model.startsWith('models/')) {
    model = model.replace(/^models\//, '');
  }
  // Default to fast, reliable gemini-flash-lite-latest to avoid 503 high-demand spikes
  if (!model || model.startsWith('gemini-2.0') || model === 'gemini-3.8-flash') {
    return 'gemini-flash-lite-latest';
  }
  return model;
}

export const FALLBACK_GEMINI_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-2.5-flash-lite',
];

export function getGeminiApiKey(): string {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();

  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }
  return key;
}

/**
 * Reusable helper to generate content with automatic model fallback
 */
export async function generateContentGemini(params: {
  contents: unknown;
  config?: unknown;
}): Promise<string> {
  const apiKey = getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const primaryModel = getGeminiModel();
  const modelsToTry = [
    primaryModel,
    ...FALLBACK_GEMINI_MODELS.filter((m) => m !== primaryModel),
  ];

  let lastError: unknown = null;
  for (const currentModel of modelsToTry) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: params.contents as any,
        config: params.config as any,
      });

      const text = response.text?.trim();
      if (text) {
        return text;
      }
    } catch (err: unknown) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[Gemini Provider] generateContent model ${currentModel} failed (${msg}). Trying next fallback model...`
      );
      continue;
    }
  }

  const errMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Gemini generateContent error: ${errMessage}`);
}

/**
 * Stream responses from Google Gemini Flash API
 */
export async function* streamGemini(
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>,
  systemPrompt: string
): AsyncGenerator<string, void, unknown> {
  const apiKey = getGeminiApiKey();

  const ai = new GoogleGenAI({ apiKey });

  // Map messages to Gemini's format: user or model
  // Filter out any system messages from the contents array as systemInstruction handles it
  const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const msg of messages) {
    if (msg.role === 'system') continue;
    const role: 'user' | 'model' = msg.role === 'assistant' ? 'model' : 'user';
    const text = msg.content?.trim() || '';
    if (!text) continue;

    // Gemini works best when consecutive messages alternate roles. Merge consecutive if needed.
    const last = formattedContents[formattedContents.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += `\n\n${text}`;
    } else {
      formattedContents.push({
        role,
        parts: [{ text }],
      });
    }
  }

  // Ensure first message is 'user'
  if (formattedContents.length === 0 || formattedContents[0].role !== 'user') {
    formattedContents.unshift({
      role: 'user',
      parts: [{ text: 'Xin chào, hãy bắt đầu buổi học TOEIC hôm nay.' }],
    });
  }

  const primaryModel = getGeminiModel();
  const modelsToTry = [
    primaryModel,
    ...FALLBACK_GEMINI_MODELS.filter((m) => m !== primaryModel),
  ];

  let lastError: unknown = null;

  for (const currentModel of modelsToTry) {
    try {
      const responseStream = await ai.models.generateContentStream({
        model: currentModel,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      let hasYieldedAny = false;
      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          hasYieldedAny = true;
          yield text;
        }
      }

      if (hasYieldedAny) {
        return;
      }
    } catch (err: unknown) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[Gemini Provider] Model ${currentModel} failed (${msg}). Trying next Gemini model...`
      );
      continue;
    }
  }

  const errMessage =
    lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Gemini API Error: ${errMessage}`);
}
