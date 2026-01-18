# Waitlist Setup Instructions

## Database Setup

You need to create the `waitlist` table in your Supabase database.

### Option 1: Run SQL Directly in Supabase

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `prisma/migrations/create_waitlist_table.sql`
4. Paste and run it

### Option 2: Use the SQL File

```bash
# Navigate to the migrations folder
cd prisma/migrations

# Run the SQL file (if you have psql installed)
psql YOUR_DATABASE_URL -f create_waitlist_table.sql
```

## Testing the Email Capture

1. Visit your homepage
2. Scroll down to the email capture section (purple gradient box)
3. Enter an email and click "Get Updates"
4. Check your Supabase `waitlist` table to see the entry

## Viewing Waitlist Entries

In Supabase:
1. Go to "Table Editor"
2. Select the `waitlist` table
3. You'll see all email signups with timestamps

## Exporting Waitlist Emails

When you're ready to send emails to your waitlist:

```sql
-- Get all emails
SELECT email, created_at FROM waitlist ORDER BY created_at DESC;

-- Export to CSV (in Supabase, use the export button)
```

## Integration with Email Service

Later, you can connect this to:
- ConvertKit
- Mailchimp
- Resend
- Any email service

Just query the waitlist table and sync the emails!
