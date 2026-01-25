-- Add customization fields to Workspace for Wall of Love pages
ALTER TABLE workspaces ADD COLUMN headline TEXT;
ALTER TABLE workspaces ADD COLUMN description TEXT;
ALTER TABLE workspaces ADD COLUMN logo_url TEXT;
ALTER TABLE workspaces ADD COLUMN primary_color VARCHAR(7) DEFAULT '#3B82F6'; -- Default blue
