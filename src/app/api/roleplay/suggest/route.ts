import { NextResponse } from 'next/server';
import { generateRoleplaySuggestions } from '@/lib/roleplay/router';
import { CharacterConfig, RoleplayScenario } from '@/types/roleplay';
import { AIModelPreference } from '@/lib/ai/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { character, scenario, chatHistory, targetScore, providerPreference, userId, userEmail, guestId } = body as {
      character: CharacterConfig;
      scenario: RoleplayScenario;
      chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
      targetScore?: number;
      providerPreference?: AIModelPreference;
      userId?: string;
      userEmail?: string;
      guestId?: string;
    };

    if (!character || !scenario) {
      return NextResponse.json(
        { error: 'character and scenario are required' },
        { status: 400 }
      );
    }

    const effectiveUserId = userId || request.headers.get('x-user-id') || undefined;
    const effectiveEmail = userEmail || request.headers.get('x-user-email') || undefined;
    const effectiveGuestId = guestId || request.headers.get('x-guest-id') || undefined;

    const result = await generateRoleplaySuggestions(
      character,
      scenario,
      chatHistory || [],
      targetScore || 650,
      providerPreference || 'auto',
      { userId: effectiveUserId, userEmail: effectiveEmail, guestId: effectiveGuestId }
    );

    return NextResponse.json({
      success: true,
      suggestions: result.suggestions,
      provider: result.provider,
      model: result.model,
      isFallback: result.isFallback,
      fallbackReason: result.fallbackReason,
    });
  } catch (error: unknown) {
    console.error('API /api/roleplay/suggest error:', error);
    // Never return an empty suggestion list on error; fallback gracefully
    return NextResponse.json(
      {
        success: true,
        error: error instanceof Error ? error.message : 'Internal Server Error',
        suggestions: [
          {
            id: 'fallback-emergency-1',
            type: 'formal',
            label: 'Trang trọng & Chuyên nghiệp',
            english: 'Thank you for bringing this to my attention. I will review the details and follow up promptly.',
            vietnamese: 'Cảm ơn bạn đã trao đổi. Tôi sẽ rà soát lại chi tiết và phản hồi sớm nhất.',
            explanation: 'Phản hồi lịch sự và thể hiện tinh thần trách nhiệm cao.',
            keyVocabulary: ['follow up', 'promptly'],
          },
          {
            id: 'fallback-emergency-2',
            type: 'casual',
            label: 'Tự nhiên & Trực diện',
            english: 'Got it! I am on it right now and will keep you posted on the progress.',
            vietnamese: 'Tôi hiểu rồi! Tôi đang xử lý ngay và sẽ liên tục cập nhật tiến độ.',
            explanation: 'Giao tiếp nhanh gọn, tự tin nơi công sở.',
            keyVocabulary: ['on it', 'keep you posted'],
          },
          {
            id: 'fallback-emergency-3',
            type: 'clarifying',
            label: 'Hỏi để làm rõ bước tiếp theo',
            english: 'Could you please confirm if there are any specific requirements we should prioritize first?',
            vietnamese: 'Bạn có thể xác nhận lại yêu cầu cụ thể nào cần được ưu tiên xử lý trước không?',
            explanation: 'Hỏi rõ thứ tự ưu tiên công việc.',
            keyVocabulary: ['confirm', 'prioritize'],
          },
        ],
        provider: 'fallback',
        isFallback: true,
        fallbackReason: 'Hệ thống AI tạm thời gián đoạn, tự động tải gợi ý tình huống dự phòng.',
      },
      { status: 200 }
    );
  }
}
