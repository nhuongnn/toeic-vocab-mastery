-- Migration: 20261123_user_ai_limits.sql
-- Add user-level and guest-level quota controls to system_ai_settings

ALTER TABLE system_ai_settings 
  ADD COLUMN IF NOT EXISTS guest_daily_limit INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS user_daily_limit INTEGER NOT NULL DEFAULT 50,
  ADD COLUMN IF NOT EXISTS user_overrides JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Table to track per-user and per-guest daily AI usage
CREATE TABLE IF NOT EXISTS ai_user_daily_usage (
  identifier TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_guest BOOLEAN NOT NULL DEFAULT false,
  used_today INTEGER NOT NULL DEFAULT 0,
  email TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (identifier, date)
);

-- Enable RLS
ALTER TABLE ai_user_daily_usage ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ai_user_daily_usage' AND policyname = 'Allow public read ai_user_daily_usage'
  ) THEN
    CREATE POLICY "Allow public read ai_user_daily_usage" 
      ON ai_user_daily_usage 
      FOR SELECT 
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ai_user_daily_usage' AND policyname = 'Allow service_role all on ai_user_daily_usage'
  ) THEN
    CREATE POLICY "Allow service_role all on ai_user_daily_usage" 
      ON ai_user_daily_usage 
      FOR ALL 
      USING (true) 
      WITH CHECK (true);
  END IF;
END $$;

-- Atomic RPC to increment user AI quota
CREATE OR REPLACE FUNCTION increment_user_ai_quota(
  p_identifier TEXT,
  p_is_guest BOOLEAN,
  p_email TEXT DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  rec ai_user_daily_usage%ROWTYPE;
BEGIN
  INSERT INTO ai_user_daily_usage (identifier, date, is_guest, used_today, email, updated_at)
  VALUES (p_identifier, today_date, p_is_guest, 1, p_email, NOW())
  ON CONFLICT (identifier, date)
  DO UPDATE SET
    used_today = ai_user_daily_usage.used_today + 1,
    email = COALESCE(EXCLUDED.email, ai_user_daily_usage.email),
    updated_at = NOW()
  RETURNING * INTO rec;

  RETURN to_jsonb(rec);
END;
$$;
