-- Auto-Chat Bubble Settings
CREATE TABLE IF NOT EXISTS auto_chat_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT false,
  start_time TEXT DEFAULT '08:00',
  end_time TEXT DEFAULT '22:00',
  interval_minutes INTEGER DEFAULT 30 CHECK (interval_minutes >= 10),
  character_role TEXT DEFAULT 'random',
  scenario_id TEXT DEFAULT 'random',
  timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auto_chat_user ON auto_chat_settings(user_id);
