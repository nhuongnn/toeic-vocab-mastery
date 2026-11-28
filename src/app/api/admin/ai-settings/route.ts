import { NextResponse } from 'next/server';
import {
  getSystemAISettingsAsync,
  updateSystemAISettings,
  resetDailyQuota,
  setUserQuotaOverride,
  removeUserQuotaOverride,
  resetUserUsageToday,
  getAllUserUsageToday,
  ADMIN_EMAIL,
  SystemAISettings,
  UserQuotaOverride,
} from '@/lib/ai/system-ai-settings';
import { isGeminiConfigured, getGeminiModel } from '@/lib/ai/gemini-provider';
import { isCloudflareChatConfigured, getCloudflareChatModel } from '@/lib/ai/cloudflare-provider';
import { supabaseAdmin } from '@/lib/supabase';
import {
  testAIModel,
  POPULAR_GEMINI_MODELS,
  POPULAR_CLOUDFLARE_MODELS,
} from '@/lib/ai/test-model';
import { TranslationProvider } from '@/types/progress';

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

    const settings = await getSystemAISettingsAsync();
    const remainingToday = Math.max(0, settings.dailyLimit - settings.usedToday);

    // Fetch registered users from Supabase Auth for quick selection
    let registeredUsers: Array<{ id: string; email: string; createdAt?: string }> = [];
    if (supabaseAdmin) {
      try {
        const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 100,
        });
        if (usersData?.users) {
          registeredUsers = usersData.users
            .filter((u) => u.email)
            .map((u) => ({
              id: u.id,
              email: u.email!,
              createdAt: u.created_at,
            }));
        }
      } catch (userErr) {
        console.warn('Failed to list registered users for admin:', userErr);
      }
    }

    // Fetch today usage counts for all users/guests
    const userUsageToday = await getAllUserUsageToday();

    return NextResponse.json({
      success: true,
      settings,
      remainingToday,
      registeredUsers,
      userUsageToday,
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
      popularModels: {
        gemini: POPULAR_GEMINI_MODELS,
        cloudflare: POPULAR_CLOUDFLARE_MODELS,
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
    const {
      email,
      action,
      settings: partialSettings,
      override,
      identifier,
    } = body as {
      email?: string;
      action?:
        | 'update_settings'
        | 'reset_quota'
        | 'set_user_override'
        | 'remove_user_override'
        | 'reset_user_quota'
        | 'test_model';
      settings?: Partial<SystemAISettings>;
      override?: {
        identifier: string;
        email?: string;
        dailyLimit: number;
        translationProvider?: TranslationProvider;
        note?: string;
      };
      identifier?: string;
    };

    if (!email || email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Từ chối truy cập: Bạn không phải quản trị viên hệ thống (nhuong2n@gmail.com).' },
        { status: 403 }
      );
    }

    // 1. Reset global daily quota
    if (action === 'reset_quota') {
      const updated = await resetDailyQuota();
      return NextResponse.json({
        success: true,
        message: 'Đã đặt lại hạn ngạch (quota) hôm nay về 0.',
        settings: updated,
        remainingToday: updated.dailyLimit,
      });
    }

    // 2. Set or update specific user override
    if (action === 'set_user_override' && override) {
      if (!override.identifier || !override.identifier.trim()) {
        return NextResponse.json(
          { error: 'Vui lòng cung cấp Email hoặc User ID của người dùng.' },
          { status: 400 }
        );
      }
      if (typeof override.dailyLimit !== 'number' || override.dailyLimit < 1) {
        return NextResponse.json(
          { error: 'Hạn mức riêng cho người dùng phải lớn hơn hoặc bằng 1.' },
          { status: 400 }
        );
      }

      const validProviders = new Set(['mymemory', 'gemini', 'cloudflare', 'auto']);
      const translationProvider =
        override.translationProvider && validProviders.has(override.translationProvider)
          ? override.translationProvider
          : undefined;

      const updated = await setUserQuotaOverride({
        identifier: override.identifier.trim(),
        email: override.email?.trim() || override.identifier.trim(),
        dailyLimit: override.dailyLimit,
        translationProvider,
        note: override.note?.trim(),
      });

      return NextResponse.json({
        success: true,
        message: `Đã thiết lập hạn mức riêng (${override.dailyLimit} lượt/ngày) cho ${override.identifier}.`,
        settings: updated,
      });
    }

    // 3. Remove specific user override
    if (action === 'remove_user_override' && identifier) {
      const updated = await removeUserQuotaOverride(identifier);
      return NextResponse.json({
        success: true,
        message: `Đã xóa hạn mức riêng của ${identifier}. Người dùng sẽ áp dụng hạn mức mặc định.`,
        settings: updated,
      });
    }

    // 4. Reset today usage for a specific user
    if (action === 'reset_user_quota' && identifier) {
      await resetUserUsageToday(identifier);
      const userUsageToday = await getAllUserUsageToday();
      return NextResponse.json({
        success: true,
        message: `Đã đặt lại lượt dùng hôm nay của ${identifier} về 0.`,
        userUsageToday,
      });
    }

    // 5. Update system settings (global limit, guest limit, logged-in user limit, toggles)
    if (action === 'update_settings' && partialSettings) {
      // Validate dailyLimit if provided
      if (typeof partialSettings.dailyLimit === 'number' && partialSettings.dailyLimit < 1) {
        return NextResponse.json(
          { error: 'Hạn ngạch toàn hệ thống (dailyLimit) phải lớn hơn 0.' },
          { status: 400 }
        );
      }

      if (typeof partialSettings.guestDailyLimit === 'number' && partialSettings.guestDailyLimit < 1) {
        return NextResponse.json(
          { error: 'Hạn ngạch khách vãng lai (guestDailyLimit) phải lớn hơn 0.' },
          { status: 400 }
        );
      }

      if (typeof partialSettings.userDailyLimit === 'number' && partialSettings.userDailyLimit < 1) {
        return NextResponse.json(
          { error: 'Hạn ngạch thành viên đăng nhập (userDailyLimit) phải lớn hơn 0.' },
          { status: 400 }
        );
      }

      const updated = await updateSystemAISettings({
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
        ...(typeof partialSettings.guestDailyLimit === 'number' && {
          guestDailyLimit: partialSettings.guestDailyLimit,
        }),
        ...(typeof partialSettings.userDailyLimit === 'number' && {
          userDailyLimit: partialSettings.userDailyLimit,
        }),
      });

      return NextResponse.json({
        success: true,
        message: 'Cập nhật thiết lập AI hệ thống thành công.',
        settings: updated,
        remainingToday: Math.max(0, updated.dailyLimit - updated.usedToday),
      });
    }

    // 6. Test an AI Model with up to 5 retries
    if (action === 'test_model') {
      const {
        provider = 'gemini',
        model,
        prompt,
      } = body as {
        provider?: 'gemini' | 'cloudflare';
        model?: string;
        prompt?: string;
      };

      const result = await testAIModel({
        provider,
        model,
        prompt,
        maxRetries: 5,
      });

      return NextResponse.json({
        success: true,
        testResult: result,
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
