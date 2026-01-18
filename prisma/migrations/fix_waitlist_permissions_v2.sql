-- Grant INSERT permission to anonymous users on waitlist table
GRANT INSERT ON TABLE waitlist TO anon;
GRANT INSERT ON TABLE waitlist TO authenticated;

-- Grant USAGE on the schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Enable RLS on the waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert into waitlist
DROP POLICY IF EXISTS "Allow anonymous inserts to waitlist" ON waitlist;
CREATE POLICY "Allow anonymous inserts to waitlist"
ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to read waitlist entries
DROP POLICY IF EXISTS "Users can read waitlist entries" ON waitlist;
CREATE POLICY "Users can read waitlist entries"
ON waitlist
FOR SELECT
TO authenticated
USING (true);
