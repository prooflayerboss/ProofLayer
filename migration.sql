-- Step 1: Add new columns to forms table
ALTER TABLE forms ADD COLUMN IF NOT EXISTS header_title TEXT DEFAULT 'Share your feedback';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS custom_message TEXT;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#3B82F6';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#FFFFFF';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT '#111827';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS secondary_text_color TEXT DEFAULT '#6B7280';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE forms ADD COLUMN IF NOT EXISTS collect_email BOOLEAN DEFAULT false;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS collect_company BOOLEAN DEFAULT true;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS collect_role BOOLEAN DEFAULT true;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS collect_social_link BOOLEAN DEFAULT false;
ALTER TABLE forms ADD COLUMN IF NOT EXISTS collect_rating BOOLEAN DEFAULT true;

-- Step 2: For workspaces WITHOUT forms, create a default form with workspace settings
INSERT INTO forms (
  id, workspace_id, name, slug, is_active,
  header_title, custom_message,
  primary_color, background_color, text_color, secondary_text_color,
  language,
  collect_email, collect_company, collect_role, collect_social_link, collect_rating,
  allow_text, allow_video, allow_screenshot,
  created_at, updated_at
)
SELECT
  gen_random_uuid(),
  w.id,
  'Main Form',
  COALESCE(w.slug, w.id) || '-main',
  true,
  COALESCE(w.header_title, 'Share your feedback'),
  w.custom_message,
  COALESCE(w.primary_color, '#3B82F6'),
  COALESCE(w.background_color, '#FFFFFF'),
  COALESCE(w.text_color, '#111827'),
  COALESCE(w.secondary_text_color, '#6B7280'),
  COALESCE(w.language, 'en'),
  COALESCE(w.collect_email, false),
  COALESCE(w.collect_company, true),
  COALESCE(w.collect_role, true),
  COALESCE(w.collect_social_link, false),
  COALESCE(w.collect_rating, true),
  true,
  false,
  true,
  NOW(),
  NOW()
FROM workspaces w
WHERE NOT EXISTS (SELECT 1 FROM forms f WHERE f.workspace_id = w.id);

-- Step 3: For workspaces WITH forms, update existing forms with workspace settings
UPDATE forms f SET
  header_title = COALESCE(w.header_title, 'Share your feedback'),
  custom_message = w.custom_message,
  primary_color = COALESCE(w.primary_color, '#3B82F6'),
  background_color = COALESCE(w.background_color, '#FFFFFF'),
  text_color = COALESCE(w.text_color, '#111827'),
  secondary_text_color = COALESCE(w.secondary_text_color, '#6B7280'),
  language = COALESCE(w.language, 'en'),
  collect_email = COALESCE(w.collect_email, false),
  collect_company = COALESCE(w.collect_company, true),
  collect_role = COALESCE(w.collect_role, true),
  collect_social_link = COALESCE(w.collect_social_link, false),
  collect_rating = COALESCE(w.collect_rating, true)
FROM workspaces w
WHERE f.workspace_id = w.id;

-- Step 4: Update logo_shape default to 'rectangle'
UPDATE workspaces SET logo_shape = 'rectangle' WHERE logo_shape = 'square' OR logo_shape IS NULL;

SELECT 'Migration completed successfully!' as status;
