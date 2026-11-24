-- User Custom Vocabulary and Sentence Patterns Table
-- Allows users to independently create, update, delete, and cloud-sync personal vocabulary and sentence patterns

CREATE TABLE IF NOT EXISTS user_custom_items (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('vocabulary', 'pattern')),
  text TEXT NOT NULL,
  ipa TEXT,
  part_of_speech TEXT,
  explanation TEXT NOT NULL,
  notes TEXT,
  context TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Alter table to ensure ipa and part_of_speech exist if table was already created
ALTER TABLE user_custom_items
  ADD COLUMN IF NOT EXISTS ipa TEXT,
  ADD COLUMN IF NOT EXISTS part_of_speech TEXT;

CREATE INDEX IF NOT EXISTS idx_user_custom_items_user_id ON user_custom_items(user_id);
CREATE INDEX IF NOT EXISTS idx_user_custom_items_type ON user_custom_items(type);

-- Enable Row Level Security (RLS)
ALTER TABLE user_custom_items ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_custom_items' AND policyname = 'Users can view their own custom items'
  ) THEN
    CREATE POLICY "Users can view their own custom items"
      ON user_custom_items
      FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_custom_items' AND policyname = 'Users can insert their own custom items'
  ) THEN
    CREATE POLICY "Users can insert their own custom items"
      ON user_custom_items
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_custom_items' AND policyname = 'Users can update their own custom items'
  ) THEN
    CREATE POLICY "Users can update their own custom items"
      ON user_custom_items
      FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_custom_items' AND policyname = 'Users can delete their own custom items'
  ) THEN
    CREATE POLICY "Users can delete their own custom items"
      ON user_custom_items
      FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;
