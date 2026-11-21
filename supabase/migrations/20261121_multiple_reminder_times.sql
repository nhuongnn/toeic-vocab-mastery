-- Add daily_reminder_times column for multi-time daily reminders
ALTER TABLE IF EXISTS notification_preferences
ADD COLUMN IF NOT EXISTS daily_reminder_times TEXT[] DEFAULT ARRAY['08:00', '12:30', '20:00']::TEXT[];

-- Migrate existing daily_reminder_time into daily_reminder_times array if daily_reminder_times is null
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'notification_preferences' 
      AND column_name = 'daily_reminder_time'
  ) THEN
    UPDATE notification_preferences
    SET daily_reminder_times = ARRAY[to_char(daily_reminder_time, 'HH24:MI')]
    WHERE daily_reminder_times IS NULL AND daily_reminder_time IS NOT NULL;
  END IF;
END $$;
