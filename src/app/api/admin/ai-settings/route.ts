import { NextResponse } from 'next/server';
import {
  getSystemAISettings,
  updateSystemAISettings,
  resetDailyQuota,
  ADMIN_EMAIL,
  SystemAISettings,
} from '@/lib/ai/system-ai-settings';
import { isGeminiConfigured, getGeminiModel } from '@/lib/ai/gemini-provider';
import { isCloudflareChatConfigured, getCloudflareChatModel } from '@/lib/ai/cloudflare-provider';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Only allow admin nhuong2n@gmail.com to inspect full admin quota details
    if (!email || email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Chỉ quản trị viên hệ thống (nhuong2n@gmail.com) mới có quyền truy cập.' },
        { status: 403 }
      );
    }

    const settings = getSystemAISettings();
    const remainingToday = Math.max(0, settings.dailyLimit - settings.usedToday);

    return NextResponse.json({
      success: true,
      settings,
      remainingToday,
      providers: {
        gemini: {
          configured: isGeminiConfigured(),
          model: getGeminiModel(),
          enabled: settings.geminiEnabled,
        },
        cloudflare: {
          configured: isCloudflareChatConfigured(),
          model: getCloudflareChatModel(),
          enabled: settings.cloudflareEnabled,
        },
      },
    });
  } catch (error: unknown) {
    console.error('Error in GET /api/admin/ai-settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, settings: partialSettings } = body as {
      email?: string;
      action?: 'update_settings' | 'reset_quota';
      settings?: Partial<SystemAISettings>;
    };

    if (!email || email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Từ chối truy cập: Bạn không phải quản trị viên hệ thống (nhuong2n@gmail.com).' },
        { status: 403 }
      );
    }

    if (action === 'reset_quota') {
      const updated = resetDailyQuota();
      return NextResponse.json({
        success: true,
        message: 'Đã đặt lại hạn ngạch (quota) hôm nay về 0.',
        settings: updated,
        remainingToday: updated.dailyLimit,
      });
    }

    if (action === 'update_settings' && partialSettings) {
      // Validate dailyLimit if provided
      if (typeof partialSettings.dailyLimit === 'number' && partialSettings.dailyLimit < 1) {
        return NextResponse.json(
          { error: 'Hạn ngạch hàng ngày (dailyLimit) phải lớn hơn 0.' },
          { status: 400 }
        );
      }

      const updated = updateSystemAISettings({
        ...(typeof partialSettings.globalEnabled === 'boolean' && {
          globalEnabled: partialSettings.globalEnabled,
        }),
        ...(typeof partialSettings.geminiEnabled === 'boolean' && {
          geminiEnabled: partialSettings.geminiEnabled,
        }),
        ...(typeof partialSettings.cloudflareEnabled === 'boolean' && {
          cloudflareEnabled: partialSettings.cloudflareEnabled,
        }),
        ...(typeof partialSettings.dailyLimit === 'number' && {
          dailyLimit: partialSettings.dailyLimit,
        }),
      });

      return NextResponse.json({
        success: true,
        message: 'Cập nhật thiết lập AI toàn hệ thống thành công.',
        settings: updated,
        remainingToday: Math.max(0, updated.dailyLimit - updated.usedToday),
      });
    }

    return NextResponse.json({ error: 'Yêu cầu không hợp lệ (action thiếu hoặc không hỗ trợ).' }, { status: 400 });
  } catch (error: unknown) {
    console.error('Error in POST /api/admin/ai-settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
