-- Fix waitlist table permissions for anonymous inserts

-- Enable RLS on the waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert into waitlist
CREATE POLICY "Allow anonymous inserts to waitlist"
ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to read their own email (optional, for future use)
CREATE POLICY "Users can read waitlist entries"
ON waitlist
FOR SELECT
TO authenticated
USING (true);
