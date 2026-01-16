# Video Testimonial Testing Guide

## ✅ What's Been Set Up

1. **Database Schema**: Added video fields to Submission model
2. **Uploadthing Integration**: Configured with your live token
3. **Form Configuration**: Added allowText and allowVideo options
4. **Video Uploader Component**: Drag-and-drop video upload with progress
5. **Wall of Love**: Updated to display video testimonials

## 🧪 How to Test

### Step 1: Access Your Form
From the logs, I can see you created a form. To find your form URL:

1. Go to http://localhost:3000/dashboard
2. Click on your workspace
3. Click on the form you created
4. Copy the **Public Form URL** (it should look like: `http://localhost:3000/f/your-form-slug`)

### Step 2: Test Video Upload

1. Open the public form URL in your browser
2. **IMPORTANT**: When both text and video are enabled, you'll see two buttons at the top:
   - **Text** (default selected)
   - **Video**
3. **Click the "Video" button** to switch to video mode
4. You should now see a drag-and-drop upload area that says:
   - "Click to upload or drag and drop"
   - "MP4, MOV, or WebM (max 128MB)"

### Step 3: Upload a Test Video

1. Either:
   - Click the upload area and select a video file
   - Or drag a video file onto the upload area
2. Fill out the required fields:
   - Name
   - Company (optional)
   - Role (optional)
   - Rating
3. Click "Submit Testimonial"

### Step 4: Verify Upload

After submission:
1. Check your Uploadthing dashboard: https://uploadthing.com/dashboard
2. You should see your uploaded video
3. The video URL will be something like: `https://utfs.io/f/abc123.mp4`

### Step 5: Verify in Database

1. Go back to your dashboard: http://localhost:3000/dashboard
2. Click on your workspace → Click on the form
3. You should see the submission in the "Submissions" tab
4. The video URL should be saved

### Step 6: Approve and View on Wall of Love

1. In your form's submissions list, click "Approve" on the video testimonial
2. Visit your Wall of Love: `http://localhost:3000/w/your-workspace-slug`
3. You should see the video testimonial with a video player

## 🐛 Troubleshooting

### "I don't see the Video button"
- Make sure you checked **both** "Allow text testimonials" AND "Allow video testimonials" when creating the form
- If you only enabled one type, you won't see the toggle buttons

### "Video upload fails"
- Check browser console for errors (F12 → Console tab)
- Verify your `.env.local` has `UPLOADTHING_TOKEN` set correctly
- Check that video file is under 128MB
- Check that file is a valid video format (MP4, MOV, WebM)

### "Video doesn't appear on Wall of Love"
- Make sure you **approved** the submission in the dashboard
- Check that the video URL was saved (should start with `https://utfs.io/`)
- Refresh the Wall of Love page

## 📝 What Happens Behind the Scenes

1. **User selects video** → VideoUploader component validates size and type
2. **Upload starts** → File is uploaded directly to Uploadthing CDN
3. **Upload completes** → Uploadthing returns a public URL
4. **Form submits** → URL is saved to database with submission
5. **Admin approves** → Submission status changes to APPROVED
6. **Wall of Love displays** → Video player shows the Uploadthing-hosted video

## ✨ Features

- **Max file size**: 128MB
- **Supported formats**: MP4, MOV, WebM, AVI
- **Drag and drop**: Yes
- **Upload progress**: Yes (shows "Uploading video..." during upload)
- **Cloud hosting**: Uploadthing CDN (no local storage)
- **Free tier**: 2GB storage, 2GB bandwidth/month

## 🎯 Next Steps After Testing

Once you confirm video upload works:
1. Test the approval workflow
2. Customize your Wall of Love with logo and branding
3. Test with real customers
4. Monitor Uploadthing usage in their dashboard

---

**Need help?** Check the browser console (F12) for any error messages.
