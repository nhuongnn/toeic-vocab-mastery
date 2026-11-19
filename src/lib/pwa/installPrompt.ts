export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const INSTALL_PROMPT_KEY = 'pwa_prompt_dismissed_until';

export function isDismissedRecently(): boolean {
  if (typeof window === 'undefined') return false;
  const dismissedUntil = localStorage.getItem(INSTALL_PROMPT_KEY);
  if (!dismissedUntil) return false;
  return Date.now() < parseInt(dismissedUntil, 10);
}

export function dismissInstallPrompt(days = 7): void {
  if (typeof window === 'undefined') return;
  const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(INSTALL_PROMPT_KEY, expiry.toString());
}
