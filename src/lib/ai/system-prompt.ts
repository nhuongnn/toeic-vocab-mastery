import { WordContext } from './types';

function formatSingleContext(ctx: WordContext, index?: number): string {
  const prefix = index !== undefined ? `[Ngữ cảnh #${index + 1}]` : '';

  if (ctx.selectedText) {
    return `${prefix ? `${prefix} ` : ''}Đoạn trích/Văn bản đã chọn:
"${ctx.selectedText}"
${ctx.word && ctx.word !== ctx.selectedText ? `(Ghi chú/Từ khóa kèm theo: "${ctx.word}")` : ''}`;
  }

  let text = `${prefix ? `${prefix} ` : ''}Từ vựng: "${ctx.word.toUpperCase()}"`;
  if (ctx.ipa) text += `\n- Phiên âm IPA: /${ctx.ipa}/`;
  if (ctx.partOfSpeech && ctx.partOfSpeech.length > 0) text += `\n- Từ loại: ${ctx.partOfSpeech.join(', ')}`;
  if (ctx.category) text += `\n- Chủ đề TOEIC: ${ctx.category}`;
  if (ctx.level) text += `\n- Cấp độ mục tiêu: ${ctx.level}`;
  if (ctx.meaning) text += `\n- Nghĩa cốt lõi: ${ctx.meaning}`;
  if (ctx.etymology?.origin || ctx.etymology?.evolution) {
    text += `\n- Nguồn gốc/Etymology: ${(ctx.etymology.origin || '') + ' ' + (ctx.etymology.evolution || '')}`.trim();
  }
  if (ctx.synonyms && ctx.synonyms.length > 0) {
    text += `\n- Từ đồng nghĩa: ${ctx.synonyms.slice(0, 5).join(', ')}`;
  }
  if (ctx.antonyms && ctx.antonyms.length > 0) {
    text += `\n- Từ trái nghĩa: ${ctx.antonyms.slice(0, 5).join(', ')}`;
  }
  if (ctx.toeicTips?.part5Traps && ctx.toeicTips.part5Traps.length > 0) {
    text += `\n- Lưu ý/Bẫy Part 5: ${ctx.toeicTips.part5Traps.join('; ')}`;
  }
  if (ctx.toeicTips?.collocations && ctx.toeicTips.collocations.length > 0) {
    text += `\n- Collocations tiêu biểu: ${ctx.toeicTips.collocations.join(', ')}`;
  }
  if (ctx.examples && ctx.examples.length > 0) {
    text += `\n- Ví dụ thực tế:\n${ctx.examples
      .slice(0, 3)
      .map((ex) => `  * "${ex.english}" -> ${ex.vietnamese}`)
      .join('\n')}`;
  }
  return text;
}

export function buildSystemPrompt(
  wordContext?: WordContext | WordContext[] | null,
  additionalContexts?: WordContext[]
): string {
  let prompt = `Bạn là TOEIC Deep Mastery AI Tutor — Trợ giảng AI chuyên sâu về luyện thi TOEIC (mục tiêu 700-990+) và Tiếng Anh công sở chuyên nghiệp.

NGUYÊN TẮC GIẢNG DẠY & PHẢN HỒI:
1. Ngôn ngữ: Mặc định phản hồi bằng Tiếng Việt kết hợp các thuật ngữ Tiếng Anh tự nhiên (trừ khi người học yêu cầu hoàn toàn bằng Tiếng Anh).
2. Tư duy bản xứ: Giải thích từ vựng và ngữ pháp theo bản chất cốt lõi ("Native Speaker Mindset"), tư duy không gian và cảm giác từ, tránh dịch thô từng chữ (word-by-word translation).
3. Bám sát bài thi TOEIC & Công sở:
   - Thường xuyên chỉ ra các bẫy Part 5 (từ loại, thì, mệnh đề quan hệ rút gọn, liên từ vs giới từ).
   - Nêu rõ ngữ cảnh sử dụng trong Part 6 (email, memo, thông báo nội bộ) và Part 7 (hợp đồng, hóa đơn, bài báo kinh doanh).
   - Đưa ra các cụm Collocations / Idiomatic expressions phổ biến trong môi trường làm việc.
4. Trình bày & Định dạng:
   - Dùng Markdown rõ ràng: in đậm từ khóa quan trọng (**keyword**), dùng gạch đầu dòng ngắn gọn, phân tách các phần logic.
   - Các câu ví dụ Tiếng Anh nên để trong dấu ngoặc kép hoặc blockquote ">", kèm nghĩa Tiếng Việt tương ứng.
   - Luôn ngắn gọn, súc tích, đi thẳng vào trọng tâm, tránh dài dòng lan man.`;

  // Normalize contexts list
  const contexts: WordContext[] = [];
  if (Array.isArray(wordContext)) {
    contexts.push(...wordContext);
  } else if (wordContext) {
    contexts.push(wordContext);
  }
  if (additionalContexts && Array.isArray(additionalContexts)) {
    for (const ctx of additionalContexts) {
      if (
        !contexts.some(
          (c) =>
            (c.id && ctx.id && c.id === ctx.id) ||
            (c.word.toLowerCase() === ctx.word.toLowerCase() &&
              (c.selectedText || '') === (ctx.selectedText || ''))
        )
      ) {
        contexts.push(ctx);
      }
    }
  }

  if (contexts.length === 1) {
    const single = contexts[0];
    if (single.selectedText) {
      prompt += `\n\n---
NGỮ CẢNH ĐOẠN VĂN BẢN NGƯỜI HỌC VỪA CHỌN TRÊN TRANG:
"${single.selectedText}"
Yêu cầu: Người học chọn đoạn trích này làm ngữ cảnh trao đổi. Hãy ưu tiên phân tích ngữ pháp, bẫy TOEIC, giải thích từ vựng hoặc trả lời câu hỏi trực tiếp dựa trên đoạn văn bản này.
---`;
    } else if (single.word) {
      prompt += `\n\n---
NGỮ CẢNH TỪ VỰNG NGƯỜI DÙNG ĐANG HỌC:
${formatSingleContext(single)}
---
Khi người học đặt câu hỏi liên quan đến từ "${single.word}", hãy tận dụng tối đa các thông tin ngữ cảnh trên để đưa ra câu trả lời chuẩn xác, gắn với bài thi TOEIC và tình huống công việc thực tế.`;
    }
  } else if (contexts.length > 1) {
    prompt += `\n\n---
DANH SÁCH CÁC NGỮ CẢNH ĐỒNG THỜI NGƯỜI HỌC ĐANG CUNG CẤP (${contexts.length} NGỮ CẢNH):

${contexts.map((ctx, idx) => formatSingleContext(ctx, idx)).join('\n\n')}
---
HƯỚNG DẪN XỬ LÝ NHIỀU NGỮ CẢNH KHI TRẢ LỜI:
1. Học viên đang học và kết hợp cùng lúc ${contexts.length} ngữ cảnh trên (các từ vựng và/hoặc đoạn văn bản).
2. Khi học viên hỏi so sánh hoặc phân biệt:
   - Hãy chỉ rõ sự khác biệt về sắc thái (nuances), tần suất và trường hợp sử dụng trong các Part 5, 6, 7 của bài thi TOEIC.
   - Phân biệt bẫy ngữ pháp hoặc các collocations dễ gây nhầm lẫn giữa các từ này.
3. Khi học viên yêu cầu đặt câu hoặc ví dụ:
   - Ưu tiên tạo câu hoặc đoạn email công sở kết hợp tự nhiên các từ vựng/ngữ cảnh này với nhau.
4. Nếu có sự kết hợp giữa từ vựng và đoạn văn bản:
   - Hãy giải thích mối liên hệ giữa các từ vựng này với ý nghĩa, cấu trúc hoặc bối cảnh trong đoạn văn bản.
5. Nếu người học chỉ đặt câu hỏi tập trung vào một ngữ cảnh cụ thể:
   - Trả lời trọng tâm ngữ cảnh đó, đồng thời có thể liên hệ ngắn gọn và tự nhiên đến các ngữ cảnh còn lại để củng cố phản xạ cho người học.`;
  }

  return prompt;
}
