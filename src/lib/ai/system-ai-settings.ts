import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '@/lib/supabase';
import { TranslationProvider } from '@/types/progress';

export interface UserQuotaOverride {
  identifier: string; // email (lowercased) or user_id
  email?: string;
  dailyLimit: number;
  translationProvider?: TranslationProvider;
  note?: string;
  updatedAt: number;
}

export interface SystemAISettings {
  globalEnabled: boolean; // Master toggle: Enable/Disable all AI features
  geminiEnabled: boolean; // Toggle Google Gemini Flash
  cloudflareEnabled: boolean; // Toggle Cloudflare Workers AI
  dailyLimit: number; // Max daily calls allowed across all models
  usedToday: number; // Total AI calls made today
  geminiUsedToday: number; // Gemini calls made today
  cloudflareUsedToday: number; // Cloudflare calls made today
  totalUsed: number; // Lifetime total calls made
  lastResetDate: string; // YYYY-MM-DD format for auto daily reset
  updatedAt: number;
  // Per-user quota configurations
  guestDailyLimit: number; // Limit for unauthenticated guest users (default: 5)
  userDailyLimit: number; // Default limit for logged-in users (default: 50)
  userOverrides: UserQuotaOverride[]; // Custom limits for specific users
}

export interface UserQuotaCheckResult {
  allowed: boolean;
  code?: 'GUEST_LIMIT_REACHED' | 'USER_LIMIT_REACHED' | 'SYSTEM_LIMIT_REACHED' | 'AI_DISABLED';
  reason?: string;
  limit: number;
  usedToday: number;
  remaining: number;
  isGuest: boolean;
}

export const ADMIN_EMAIL = 'nhuong2n@gmail.com';

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

const DEFAULT_SETTINGS: SystemAISettings = {
  globalEnabled: true,
  geminiEnabled: true,
  cloudflareEnabled: true,
  dailyLimit: 1500,
  usedToday: 0,
  geminiUsedToday: 0,
  cloudflareUsedToday: 0,
  totalUsed: 0,
  lastResetDate: getTodayDateString(),
  updatedAt: Date.now(),
  guestDailyLimit: 5,
  userDailyLimit: 50,
  userOverrides: [],
};

// In-memory cache for ultra-fast (0ms) access during streaming/API requests
let memoryCache: SystemAISettings | null = null;
let lastCloudSyncTime = 0;
const CLOUD_CACHE_TTL_MS = 15_000; // Refresh cache from cloud every 15s in background
let isSyncing = false;

// In-memory cache for per-user daily usage: key = identifier:date
const userDailyUsageCache = new Map<string, number>();

function isServerless(): boolean {
  return Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NOW_REGION ||
    process.env.LAMBDA_TASK_ROOT
  );
}

function getWritableFilePath(): string {
  if (isServerless()) {
    const dir = path.join('/tmp', 'cache');
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch {
      // ignore
    }
    return path.join(dir, 'system-ai-settings.json');
  }

  const dir = path.join(process.cwd(), 'public', 'cache');
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {
    // ignore
  }
  return path.join(dir, 'system-ai-settings.json');
}

function getReadableFilePath(): string {
  const writablePath = getWritableFilePath();
  if (fs.existsSync(writablePath)) {
    return writablePath;
  }
  const bundledPath = path.join(process.cwd(), 'public', 'cache', 'system-ai-settings.json');
  if (fs.existsSync(bundledPath)) {
    return bundledPath;
  }
  return writablePath;
}

// Convert Supabase database row (snake_case) to TypeScript SystemAISettings (camelCase)
interface DbRow {
  id?: string;
  global_enabled?: boolean;
  gemini_enabled?: boolean;
  cloudflare_enabled?: boolean;
  daily_limit?: number;
  used_today?: number;
  gemini_used_today?: number;
  cloudflare_used_today?: number;
  total_used?: number;
  last_reset_date?: string;
  updated_at?: string;
  guest_daily_limit?: number;
  user_daily_limit?: number;
  user_overrides?: UserQuotaOverride[] | string;
}

function parseUserOverrides(raw: unknown): UserQuotaOverride[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as UserQuotaOverride[];
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as UserQuotaOverride[];
    } catch {
      // ignore
    }
  }
  return [];
}

function dbRowToSettings(row: DbRow): SystemAISettings {
  return {
    globalEnabled: row.global_enabled ?? true,
    geminiEnabled: row.gemini_enabled ?? true,
    cloudflareEnabled: row.cloudflare_enabled ?? true,
    dailyLimit: Number(row.daily_limit ?? 1500),
    usedToday: Number(row.used_today ?? 0),
    geminiUsedToday: Number(row.gemini_used_today ?? 0),
    cloudflareUsedToday: Number(row.cloudflare_used_today ?? 0),
    totalUsed: Number(row.total_used ?? 0),
    lastResetDate: String(row.last_reset_date || getTodayDateString()),
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
    guestDailyLimit: Number(row.guest_daily_limit ?? 5),
    userDailyLimit: Number(row.user_daily_limit ?? 50),
    userOverrides: parseUserOverrides(row.user_overrides),
  };
}

function settingsToDbRow(s: SystemAISettings): DbRow {
  return {
    id: 'global_config',
    global_enabled: s.globalEnabled,
    gemini_enabled: s.geminiEnabled,
    cloudflare_enabled: s.cloudflareEnabled,
    daily_limit: s.dailyLimit,
    used_today: s.usedToday,
    gemini_used_today: s.geminiUsedToday,
    cloudflare_used_today: s.cloudflareUsedToday,
    total_used: s.totalUsed,
    last_reset_date: s.lastResetDate,
    updated_at: new Date(s.updatedAt || Date.now()).toISOString(),
    guest_daily_limit: s.guestDailyLimit ?? 5,
    user_daily_limit: s.userDailyLimit ?? 50,
    user_overrides: s.userOverrides || [],
  };
}

/**
 * Save settings to local disk cache (fallback layer).
 */
function saveLocalDiskCache(settings: SystemAISettings): void {
  try {
    const filePath = getWritableFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err: unknown) {
    console.warn('[SystemAISettings] Local disk write skipped:', (err as Error)?.message || err);
  }
}

/**
 * Load settings from local disk cache.
 */
function loadLocalDiskCache(): SystemAISettings {
  const filePath = getReadableFilePath();
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return { ...DEFAULT_SETTINGS, ...JSON.parse(fileContent) };
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Failed to parse local config file:', err);
    }
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * Asynchronous background helpers
 */
function syncDailyResetToCloud(current: SystemAISettings): void {
  const client = supabaseAdmin;
  if (!client) return;
  (async () => {
    try {
      await client
        .from('system_ai_settings')
        .update(settingsToDbRow(current))
        .eq('id', 'global_config');
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Background daily reset sync error:', err);
    }
  })();
}

function syncCacheFromCloud(): void {
  const client = supabaseAdmin;
  if (!client || isSyncing) return;
  isSyncing = true;
  (async () => {
    try {
      const { data, error } = await client
        .from('system_ai_settings')
        .select('*')
        .eq('id', 'global_config')
        .maybeSingle();
      if (!error && data) {
        memoryCache = dbRowToSettings(data);
        lastCloudSyncTime = Date.now();
        saveLocalDiskCache(memoryCache);
      }
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Background sync failed:', err);
    } finally {
      isSyncing = false;
    }
  })();
}

function syncIncrementToCloud(provider: 'gemini' | 'cloudflare', current: SystemAISettings): void {
  const client = supabaseAdmin;
  if (!client) return;
  (async () => {
    try {
      const { data, error } = await client.rpc('increment_ai_quota', { p_provider: provider });
      if (!error && data) {
        const cloudSettings = dbRowToSettings(data as DbRow);
        memoryCache = {
          ...cloudSettings,
          globalEnabled: current.globalEnabled,
          geminiEnabled: current.geminiEnabled,
          cloudflareEnabled: current.cloudflareEnabled,
          guestDailyLimit: current.guestDailyLimit,
          userDailyLimit: current.userDailyLimit,
          userOverrides: current.userOverrides,
        };
        lastCloudSyncTime = Date.now();
        saveLocalDiskCache(memoryCache);
      } else {
        // Fallback to direct update if RPC fails
        await client
          .from('system_ai_settings')
          .update(settingsToDbRow(current))
          .eq('id', 'global_config');
      }
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Failed to record usage to Supabase:', err);
    }
  })();
}

/**
 * Asynchronously fetch settings from Supabase Cloud.
 * Updates in-memory cache and local disk fallback.
 */
export async function getSystemAISettingsAsync(): Promise<SystemAISettings> {
  const today = getTodayDateString();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('system_ai_settings')
        .select('*')
        .eq('id', 'global_config')
        .maybeSingle();

      if (!error && data) {
        let settings = dbRowToSettings(data);

        // Auto daily reset if date has advanced
        if (settings.lastResetDate !== today) {
          settings.usedToday = 0;
          settings.geminiUsedToday = 0;
          settings.cloudflareUsedToday = 0;
          settings.lastResetDate = today;
          settings.updatedAt = Date.now();

          await supabaseAdmin
            .from('system_ai_settings')
            .update(settingsToDbRow(settings))
            .eq('id', 'global_config');
        }

        memoryCache = settings;
        lastCloudSyncTime = Date.now();
        saveLocalDiskCache(settings);
        return { ...settings };
      } else if (!data) {
        // Table exists but row not initialized yet - seed default row
        const seeded = { ...DEFAULT_SETTINGS, lastResetDate: today, updatedAt: Date.now() };
        await supabaseAdmin
          .from('system_ai_settings')
          .upsert(settingsToDbRow(seeded));
        memoryCache = seeded;
        lastCloudSyncTime = Date.now();
        saveLocalDiskCache(seeded);
        return { ...seeded };
      }
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Supabase cloud fetch failed, using local fallback:', err);
    }
  }

  // Supabase unavailable: fall back to local disk / memory cache
  return getSystemAISettings();
}

/**
 * Synchronous access for ultra-low latency (0ms) streaming calls.
 * Triggers background sync to Supabase when cache becomes stale.
 */
export function getSystemAISettings(): SystemAISettings {
  const today = getTodayDateString();

  if (!memoryCache) {
    memoryCache = loadLocalDiskCache();
  }

  const current: SystemAISettings = memoryCache ?? { ...DEFAULT_SETTINGS };

  // Auto reset daily quota if date changed
  if (current.lastResetDate !== today) {
    current.usedToday = 0;
    current.geminiUsedToday = 0;
    current.cloudflareUsedToday = 0;
    current.lastResetDate = today;
    current.updatedAt = Date.now();
    memoryCache = current;
    saveLocalDiskCache(current);

    // Sync reset to cloud in background
    syncDailyResetToCloud(current);
  }

  // Trigger background cloud refresh if cache TTL expired
  if (Date.now() - lastCloudSyncTime > CLOUD_CACHE_TTL_MS) {
    syncCacheFromCloud();
  }

  return { ...current };
}

/**
 * Save updated system-wide AI settings to Supabase Cloud and local cache.
 */
export async function saveSystemAISettings(settings: SystemAISettings): Promise<SystemAISettings> {
  const updated = {
    ...settings,
    updatedAt: Date.now(),
  };

  memoryCache = updated;
  lastCloudSyncTime = Date.now();
  saveLocalDiskCache(updated);

  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('system_ai_settings')
        .upsert(settingsToDbRow(updated));

      if (error) {
        console.warn('[SystemAISettings] Error saving to Supabase:', error.message);
      }
    } catch (err: unknown) {
      console.warn('[SystemAISettings] Failed to sync settings to Supabase:', err);
    }
  }

  return { ...updated };
}

/**
 * Update partial settings and persist to Supabase Cloud.
 */
export async function updateSystemAISettings(partial: Partial<SystemAISettings>): Promise<SystemAISettings> {
  let current: SystemAISettings;
  try {
    current = await getSystemAISettingsAsync();
  } catch {
    current = getSystemAISettings();
  }

  const next: SystemAISettings = {
    ...current,
    ...partial,
  };

  return await saveSystemAISettings(next);
}

/**
 * Record a successful AI call to system-wide quota counters.
 * Updates local memory immediately (0ms) and invokes Supabase atomic RPC increment in background.
 */
export function recordAIUsage(provider: 'gemini' | 'cloudflare'): void {
  const current = getSystemAISettings();
  current.usedToday += 1;
  current.totalUsed += 1;
  if (provider === 'gemini') {
    current.geminiUsedToday += 1;
  } else {
    current.cloudflareUsedToday += 1;
  }
  current.updatedAt = Date.now();
  memoryCache = current;
  saveLocalDiskCache(current);

  // Atomic increment directly on Supabase PostgreSQL via RPC
  syncIncrementToCloud(provider, current);
}

/**
 * Reset today's quota back to 0 on Supabase Cloud and local cache.
 */
export async function resetDailyQuota(): Promise<SystemAISettings> {
  const current = await getSystemAISettingsAsync();
  current.usedToday = 0;
  current.geminiUsedToday = 0;
  current.cloudflareUsedToday = 0;
  current.lastResetDate = getTodayDateString();
  return await saveSystemAISettings(current);
}

/**
 * Check if AI can be used globally.
 */
export function canUseAI(): { allowed: boolean; reason?: string } {
  const settings = getSystemAISettings();

  if (!settings.globalEnabled) {
    return {
      allowed: false,
      reason: 'Hệ thống AI hiện đang tạm tắt bởi Quản trị viên hệ thống. Vui lòng thử lại sau.',
    };
  }

  if (settings.usedToday >= settings.dailyLimit) {
    return {
      allowed: false,
      reason: `Hệ thống AI đã đạt giới hạn hạn ngạch trong ngày (${settings.dailyLimit} lượt). Vui lòng thử lại vào ngày mai hoặc liên hệ quản trị viên.`,
    };
  }

  return { allowed: true };
}

/**
 * Check if a specific AI provider is allowed by system settings.
 */
export function canUseProvider(provider: 'gemini' | 'cloudflare'): boolean {
  const settings = getSystemAISettings();
  if (!settings.globalEnabled) return false;
  if (settings.usedToday >= settings.dailyLimit) return false;

  if (provider === 'gemini') {
    return settings.geminiEnabled;
  }
  if (provider === 'cloudflare') {
    return settings.cloudflareEnabled;
  }
  return true;
}

// ==============================================================================
// PER-USER & GUEST AI QUOTA MANAGEMENT
// ==============================================================================

/**
 * Query a user or guest's current usage count for today.
 * Checks memory cache first, then Supabase table ai_user_daily_usage.
 */
export async function getUserUsageTodayAsync(identifier: string): Promise<number> {
  const today = getTodayDateString();
  const cacheKey = `${identifier}:${today}`;

  if (userDailyUsageCache.has(cacheKey)) {
    return userDailyUsageCache.get(cacheKey) || 0;
  }

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_user_daily_usage')
        .select('used_today')
        .eq('identifier', identifier)
        .eq('date', today)
        .maybeSingle();

      if (!error && data) {
        const count = Number(data.used_today || 0);
        userDailyUsageCache.set(cacheKey, count);
        return count;
      }
    } catch (err) {
      console.warn('[SystemAISettings] Error querying user daily usage:', err);
    }
  }

  return 0;
}

/**
 * Synchronous read of user usage today from memory cache.
 */
export function getUserUsageTodaySync(identifier: string): number {
  const today = getTodayDateString();
  const cacheKey = `${identifier}:${today}`;
  return userDailyUsageCache.get(cacheKey) || 0;
}

/**
 * Check user or guest AI quota limits.
 * Differentiates between guest (unauthenticated) and logged-in user, and checks for individual user overrides.
 */
export async function checkUserAIQuota({
  userId,
  userEmail,
  guestId,
}: {
  userId?: string | null;
  userEmail?: string | null;
  guestId?: string | null;
}): Promise<UserQuotaCheckResult> {
  // 1. Check global AI availability first
  const globalCheck = canUseAI();
  if (!globalCheck.allowed) {
    const settings = getSystemAISettings();
    return {
      allowed: false,
      code: !settings.globalEnabled ? 'AI_DISABLED' : 'SYSTEM_LIMIT_REACHED',
      reason: globalCheck.reason,
      limit: 0,
      usedToday: 0,
      remaining: 0,
      isGuest: !userId && !userEmail,
    };
  }

  const settings = await getSystemAISettingsAsync();
  const isGuest = !userId && !userEmail;

  // Case A: Guest User (Unauthenticated)
  if (isGuest) {
    const cleanGuestId = (guestId && guestId.trim()) || 'guest_anonymous';
    const guestLimit = settings.guestDailyLimit ?? 5;
    const usedToday = await getUserUsageTodayAsync(cleanGuestId);
    const remaining = Math.max(0, guestLimit - usedToday);

    if (usedToday >= guestLimit) {
      return {
        allowed: false,
        code: 'GUEST_LIMIT_REACHED',
        reason: `Bạn đã sử dụng hết hạn mức ${guestLimit} lượt AI miễn phí hôm nay dành cho khách chưa đăng nhập. Vui lòng đăng nhập để được nâng hạn mức sử dụng!`,
        limit: guestLimit,
        usedToday,
        remaining: 0,
        isGuest: true,
      };
    }

    return {
      allowed: true,
      limit: guestLimit,
      usedToday,
      remaining,
      isGuest: true,
    };
  }

  // Case B: Logged-in User
  const emailKey = userEmail?.trim().toLowerCase() || '';
  const userIdKey = userId?.trim() || '';
  const primaryIdentifier = emailKey || userIdKey;

  // Check if this specific user has an override configured
  const overrides = settings.userOverrides || [];
  const override = overrides.find((o) => {
    const oId = (o.identifier || '').trim().toLowerCase();
    const oEmail = (o.email || '').trim().toLowerCase();
    return (
      (emailKey && (oId === emailKey || oEmail === emailKey)) ||
      (userIdKey && oId === userIdKey)
    );
  });

  const effectiveLimit = override ? override.dailyLimit : (settings.userDailyLimit ?? 50);
  const usedToday = await getUserUsageTodayAsync(primaryIdentifier);
  const remaining = Math.max(0, effectiveLimit - usedToday);

  if (usedToday >= effectiveLimit) {
    return {
      allowed: false,
      code: 'USER_LIMIT_REACHED',
      reason: `Bạn đã sử dụng hết ${effectiveLimit} lượt AI trong ngày hôm nay. Hạn mức sẽ được làm mới vào lúc 00:00 ngày mai.`,
      limit: effectiveLimit,
      usedToday,
      remaining: 0,
      isGuest: false,
    };
  }

  return {
    allowed: true,
    limit: effectiveLimit,
    usedToday,
    remaining,
    isGuest: false,
  };
}

/**
 * Record a user or guest's AI usage and increment counters atomically.
 */
export function recordUserAIUsage({
  userId,
  userEmail,
  guestId,
  provider,
}: {
  userId?: string | null;
  userEmail?: string | null;
  guestId?: string | null;
  provider?: 'gemini' | 'cloudflare';
}): void {
  // 1. Record global usage
  if (provider) {
    recordAIUsage(provider);
  }

  // 2. Determine user identifier
  const isGuest = !userId && !userEmail;
  const identifier = isGuest
    ? (guestId && guestId.trim()) || 'guest_anonymous'
    : userEmail?.trim().toLowerCase() || userId?.trim() || 'unknown_user';

  const today = getTodayDateString();
  const cacheKey = `${identifier}:${today}`;

  // Update memory cache immediately
  const currentCount = userDailyUsageCache.get(cacheKey) || 0;
  userDailyUsageCache.set(cacheKey, currentCount + 1);

  // Background sync to Supabase
  if (supabaseAdmin) {
    (async () => {
      try {
        const { error } = await supabaseAdmin.rpc('increment_user_ai_quota', {
          p_identifier: identifier,
          p_is_guest: isGuest,
          p_email: userEmail?.trim().toLowerCase() || null,
        });

        if (error) {
          // Fallback to manual upsert if RPC has an issue
          const { data: existing } = await supabaseAdmin
            .from('ai_user_daily_usage')
            .select('used_today')
            .eq('identifier', identifier)
            .eq('date', today)
            .maybeSingle();

          const nextCount = (existing?.used_today || 0) + 1;
          await supabaseAdmin.from('ai_user_daily_usage').upsert({
            identifier,
            date: today,
            is_guest: isGuest,
            used_today: nextCount,
            email: userEmail?.trim().toLowerCase() || null,
            updated_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn('[SystemAISettings] Failed to sync user usage to Supabase:', err);
      }
    })();
  }
}

/**
 * Get optional per-user translation provider override configured by Admin.
 */
export async function getUserTranslationProviderOverride({
  userId,
  userEmail,
}: {
  userId?: string | null;
  userEmail?: string | null;
}): Promise<TranslationProvider | undefined> {
  const emailKey = userEmail?.trim().toLowerCase() || '';
  const userIdKey = userId?.trim().toLowerCase() || '';
  if (!emailKey && !userIdKey) return undefined;

  const settings = await getSystemAISettingsAsync();
  const overrides = settings.userOverrides || [];
  const match = overrides.find((o) => {
    const oId = (o.identifier || '').trim().toLowerCase();
    const oEmail = (o.email || '').trim().toLowerCase();
    return (
      (emailKey && (oId === emailKey || oEmail === emailKey)) ||
      (userIdKey && oId === userIdKey)
    );
  });

  return match?.translationProvider;
}

/**
 * Add or update a specific user override in settings.
 */
export async function setUserQuotaOverride(override: {
  identifier: string;
  email?: string;
  dailyLimit: number;
  translationProvider?: TranslationProvider;
  note?: string;
}): Promise<SystemAISettings> {
  const current = await getSystemAISettingsAsync();
  const cleanId = override.identifier.trim().toLowerCase();
  const cleanEmail = (override.email || override.identifier).trim().toLowerCase();

  const existingOverrides = current.userOverrides || [];
  const index = existingOverrides.findIndex(
    (o) => o.identifier.toLowerCase() === cleanId || (o.email && o.email.toLowerCase() === cleanEmail)
  );

  const newEntry: UserQuotaOverride = {
    identifier: cleanId,
    email: cleanEmail,
    dailyLimit: Math.max(1, override.dailyLimit),
    ...(override.translationProvider ? { translationProvider: override.translationProvider } : {}),
    note: override.note?.trim() || '',
    updatedAt: Date.now(),
  };

  let nextOverrides: UserQuotaOverride[];
  if (index >= 0) {
    nextOverrides = [...existingOverrides];
    nextOverrides[index] = newEntry;
  } else {
    nextOverrides = [newEntry, ...existingOverrides];
  }

  return await updateSystemAISettings({ userOverrides: nextOverrides });
}

/**
 * Remove a specific user override from settings.
 */
export async function removeUserQuotaOverride(identifier: string): Promise<SystemAISettings> {
  const current = await getSystemAISettingsAsync();
  const cleanId = identifier.trim().toLowerCase();

  const nextOverrides = (current.userOverrides || []).filter(
    (o) => o.identifier.toLowerCase() !== cleanId && o.email?.toLowerCase() !== cleanId
  );

  return await updateSystemAISettings({ userOverrides: nextOverrides });
}

/**
 * Reset a specific user or guest's today usage count back to 0.
 */
export async function resetUserUsageToday(identifier: string): Promise<void> {
  const cleanId = identifier.trim().toLowerCase();
  const today = getTodayDateString();
  const cacheKey = `${cleanId}:${today}`;
  userDailyUsageCache.set(cacheKey, 0);

  if (supabaseAdmin) {
    try {
      await supabaseAdmin
        .from('ai_user_daily_usage')
        .delete()
        .eq('identifier', cleanId)
        .eq('date', today);
    } catch (err) {
      console.warn('[SystemAISettings] Error resetting user usage in Supabase:', err);
    }
  }
}

/**
 * Fetch all usage stats for today (used by Admin UI).
 */
export async function getAllUserUsageToday(): Promise<Record<string, { usedToday: number; email?: string; isGuest: boolean }>> {
  const today = getTodayDateString();
  const result: Record<string, { usedToday: number; email?: string; isGuest: boolean }> = {};

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('ai_user_daily_usage')
        .select('*')
        .eq('date', today);

      if (!error && Array.isArray(data)) {
        for (const row of data) {
          result[row.identifier] = {
            usedToday: Number(row.used_today || 0),
            email: row.email || undefined,
            isGuest: Boolean(row.is_guest),
          };
          userDailyUsageCache.set(`${row.identifier}:${today}`, Number(row.used_today || 0));
        }
      }
    } catch (err) {
      console.warn('[SystemAISettings] Error fetching all user daily usage:', err);
    }
  }

  return result;
}
