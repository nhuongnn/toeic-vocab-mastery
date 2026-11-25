-- Add Web Push support columns to auto_chat_settings
ALTER TABLE auto_chat_settings
  ADD COLUMN IF NOT EXISTS push_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS last_sent_at TIMESTAMPTZ;
