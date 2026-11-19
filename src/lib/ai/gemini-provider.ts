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
  return process.env.GEMINI_MODEL?.trim() || 'gemini-2.0-flash';
}

function getGeminiApiKey(): string {
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
 * Stream responses from Google Gemini Flash API
 */
export async function* streamGemini(
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>,
  systemPrompt: string
): AsyncGenerator<string, void, unknown> {
  const apiKey = getGeminiApiKey();
  const model = getGeminiModel();

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

  try {
    const responseStream = await ai.models.generateContentStream({
      model,
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    throw new Error(`Gemini API Error: ${errMessage}`);
  }
}
