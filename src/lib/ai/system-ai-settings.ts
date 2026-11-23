import fs from 'fs';
import path from 'path';

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

const DEFAULT_SETTINGS: SystemAISettings = {
  globalEnabled: true,
  geminiEnabled: true,
  cloudflareEnabled: true,
  dailyLimit: 1500,
  usedToday: 0,
  geminiUsedToday: 0,
  cloudflareUsedToday: 0,
  totalUsed: 0,
  lastResetDate: new Date().toISOString().split('T')[0],
  updatedAt: Date.now(),
};

// In-memory cache for ultra-fast access during streaming/API requests
let memoryCache: SystemAISettings | null = null;

function getConfigFilePath(): string {
  const dir = path.join(process.cwd(), 'public', 'cache');
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // ignore
    }
  }
  return path.join(dir, 'system-ai-settings.json');
}

/**
 * Get current system-wide AI settings and quota.
 * Automatically resets daily counters if a new day has arrived.
 */
export function getSystemAISettings(): SystemAISettings {
  const today = new Date().toISOString().split('T')[0];

  if (!memoryCache) {
    const filePath = getConfigFilePath();
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        memoryCache = { ...DEFAULT_SETTINGS, ...JSON.parse(fileContent) };
      } catch (err) {
        console.warn('[SystemAISettings] Failed to parse config file, using defaults:', err);
        memoryCache = { ...DEFAULT_SETTINGS };
      }
    } else {
      memoryCache = { ...DEFAULT_SETTINGS };
      saveSystemAISettings(memoryCache);
    }
  }

  const current: SystemAISettings = memoryCache ?? { ...DEFAULT_SETTINGS };

  // Auto reset daily quota if date changed
  if (current.lastResetDate !== today) {
    current.usedToday = 0;
    current.geminiUsedToday = 0;
    current.cloudflareUsedToday = 0;
    current.lastResetDate = today;
    current.updatedAt = Date.now();
    return saveSystemAISettings(current);
  }

  return { ...current };
}

/**
 * Save updated system-wide AI settings to disk and memory cache.
 */
export function saveSystemAISettings(settings: SystemAISettings): SystemAISettings {
  const updated = {
    ...settings,
    updatedAt: Date.now(),
  };
  memoryCache = updated;

  try {
    const filePath = getConfigFilePath();
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('[SystemAISettings] Failed to save config to disk:', err);
  }

  return { ...updated };
}

/**
 * Partial update helper
 */
export function updateSystemAISettings(partial: Partial<SystemAISettings>): SystemAISettings {
  const current = getSystemAISettings();
  const next: SystemAISettings = {
    ...current,
    ...partial,
  };
  return saveSystemAISettings(next);
}

/**
 * Record a successful AI call to system-wide quota counters.
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
  saveSystemAISettings(current);
}

/**
 * Reset today's quota back to 0.
 */
export function resetDailyQuota(): SystemAISettings {
  const current = getSystemAISettings();
  current.usedToday = 0;
  current.geminiUsedToday = 0;
  current.cloudflareUsedToday = 0;
  current.lastResetDate = new Date().toISOString().split('T')[0];
  return saveSystemAISettings(current);
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
