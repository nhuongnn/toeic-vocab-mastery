export interface TranslationModelOption {
  id: string;
  name: string;
  note: string;
}

export const TRANSLATION_GEMINI_MODELS: TranslationModelOption[] = [
  { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite Latest (Mặc định)', note: 'Nhanh & ổn định nhất' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', note: 'Thế hệ mới siêu tốc' },
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', note: 'Cân bằng tốc độ & chất lượng' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', note: 'Hiểu ngữ cảnh sâu' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite', note: 'Nhẹ, tiết kiệm quota' },
];

export const TRANSLATION_CLOUDFLARE_MODELS: TranslationModelOption[] = [
  { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct (Mặc định)', note: 'Ổn định nhất trên CF' },
  { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 8B Instruct', note: 'Llama 3 tiêu chuẩn' },
  { id: '@cf/mistral/mistral-7b-instruct-v0.1', name: 'Mistral 7B Instruct v0.1', note: 'Phản hồi nhanh' },
  { id: '@cf/qwen/qwen1.5-7b-chat', name: 'Qwen 1.5 7B Chat', note: 'Tối ưu đa ngôn ngữ' },
  { id: '@cf/google/gemma-7b-it', name: 'Gemma 7B IT', note: 'Gemma trên Cloudflare' },
];

export const DEFAULT_TRANSLATION_GEMINI_MODEL = 'gemini-flash-lite-latest';
export const DEFAULT_TRANSLATION_CLOUDFLARE_MODEL = '@cf/meta/llama-3.1-8b-instruct';

export function formatShortModelName(model?: string): string {
  if (!model) return '';
  return model.replace(/^@cf\/[^/]+\//, '');
}
