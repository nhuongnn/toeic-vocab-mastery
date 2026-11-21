-- Push Subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  keys JSONB NOT NULL,          -- { p256dh, auth }
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  UNIQUE(user_id, endpoint)
);

-- Notification Preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_reminder_enabled BOOLEAN DEFAULT true,
  daily_reminder_time TIME DEFAULT '08:00',
  daily_reminder_times TEXT[] DEFAULT ARRAY['08:00', '12:30', '20:00']::TEXT[],
  streak_warning_enabled BOOLEAN DEFAULT true,
  streak_warning_time TIME DEFAULT '20:00',
  weekly_summary_enabled BOOLEAN DEFAULT true,
  srs_due_reminder_enabled BOOLEAN DEFAULT true,
  milestone_enabled BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification Queue (for Supabase Edge Function CRON)
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,           -- 'daily_reminder', 'streak_warning', etc.
  payload JSONB NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled 
  ON notification_queue(scheduled_for) 
  WHERE status = 'pending';
