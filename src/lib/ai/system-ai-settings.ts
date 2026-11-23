import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '@/lib/supabase';

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
};

// In-memory cache for ultra-fast (0ms) access during streaming/API requests
let memoryCache: SystemAISettings | null = null;
let lastCloudSyncTime = 0;
const CLOUD_CACHE_TTL_MS = 15_000; // Refresh cache from cloud every 15s in background
let isSyncing = false;

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
