-- System-wide AI Settings and Quota Management Table
-- Stores global AI configuration and quota tracking across all users and models

CREATE TABLE IF NOT EXISTS system_ai_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_config',
  global_enabled BOOLEAN NOT NULL DEFAULT true,
  gemini_enabled BOOLEAN NOT NULL DEFAULT true,
  cloudflare_enabled BOOLEAN NOT NULL DEFAULT true,
  daily_limit INTEGER NOT NULL DEFAULT 1500,
  used_today INTEGER NOT NULL DEFAULT 0,
  gemini_used_today INTEGER NOT NULL DEFAULT 0,
  cloudflare_used_today INTEGER NOT NULL DEFAULT 0,
  total_used INTEGER NOT NULL DEFAULT 0,
  last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial row if it does not already exist
INSERT INTO system_ai_settings (
  id,
  global_enabled,
  gemini_enabled,
  cloudflare_enabled,
  daily_limit,
  used_today,
  gemini_used_today,
  cloudflare_used_today,
  total_used,
  last_reset_date,
  updated_at
)
VALUES (
  'global_config',
  true,
  true,
  true,
  1500,
  0,
  0,
  0,
  0,
  CURRENT_DATE,
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE system_ai_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read so client-side or anon API checks can read availability if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'system_ai_settings' AND policyname = 'Allow public read system_ai_settings'
  ) THEN
    CREATE POLICY "Allow public read system_ai_settings" 
      ON system_ai_settings 
      FOR SELECT 
      USING (true);
  END IF;
END $$;

-- Allow service role full control (bypasses RLS by default, but explicit policy for clarity)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'system_ai_settings' AND policyname = 'Allow service_role all on system_ai_settings'
  ) THEN
    CREATE POLICY "Allow service_role all on system_ai_settings" 
      ON system_ai_settings 
      FOR ALL 
      USING (true) 
      WITH CHECK (true);
  END IF;
END $$;

-- Atomic RPC function to increment AI quota without race conditions
CREATE OR REPLACE FUNCTION increment_ai_quota(p_provider TEXT)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  rec system_ai_settings%ROWTYPE;
BEGIN
  -- Lock row for update
  SELECT * INTO rec FROM system_ai_settings WHERE id = 'global_config' FOR UPDATE;
  
  -- Create row if missing
  IF NOT FOUND THEN
    INSERT INTO system_ai_settings (
      id, global_enabled, gemini_enabled, cloudflare_enabled,
      daily_limit, used_today, gemini_used_today, cloudflare_used_today,
      total_used, last_reset_date, updated_at
    )
    VALUES (
      'global_config', true, true, true,
      1500, 0, 0, 0,
      0, today_date, NOW()
    )
    RETURNING * INTO rec;
  END IF;

  -- Daily reset if date has advanced
  IF rec.last_reset_date < today_date THEN
    rec.used_today := 0;
    rec.gemini_used_today := 0;
    rec.cloudflare_used_today := 0;
    rec.last_reset_date := today_date;
  END IF;

  -- Increment counters
  rec.used_today := rec.used_today + 1;
  rec.total_used := rec.total_used + 1;
  IF p_provider = 'gemini' THEN
    rec.gemini_used_today := rec.gemini_used_today + 1;
  ELSIF p_provider = 'cloudflare' THEN
    rec.cloudflare_used_today := rec.cloudflare_used_today + 1;
  END IF;

  rec.updated_at := NOW();

  UPDATE system_ai_settings
  SET
    used_today = rec.used_today,
    gemini_used_today = rec.gemini_used_today,
    cloudflare_used_today = rec.cloudflare_used_today,
    total_used = rec.total_used,
    last_reset_date = rec.last_reset_date,
    updated_at = rec.updated_at
  WHERE id = 'global_config';

  RETURN to_jsonb(rec);
END;
$$;
