# 🚀 PathFinder - Deployment Guide

## Quick Start Deployment

This guide will help you deploy PathFinder to Firebase in **under 10 minutes**.

---

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Google account
- [ ] Node.js v18+ installed
- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] (Optional) YouTube Data API key from Google Cloud Console

---

## Step 1: Create Firebase Project (2 minutes)

### Via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `pathfinder-platform` (or your choice)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Enable Services

In your Firebase project:

1. **Firestore Database**
   - Go to **Build → Firestore Database**
   - Click **"Create database"**
   - Select **"Start in production mode"**
   - Choose location (us-central recommended)

2. **Authentication** (Optional - for future)
   - Go to **Build → Authentication**
   - Click **"Get started"**
   - Enable **Email/Password** and **Google** providers

3. **Storage**
   - Go to **Build → Storage**
   - Click **"Get started"**
   - Use default security rules

---

## Step 2: Configure Local Environment (3 minutes)

### Login to Firebase

```bash
firebase login
```

### Initialize Firebase in Your Project

```bash
cd engineering-guidance-platform
firebase init
```

When prompted, select:
- [x] Firestore
- [x] Functions
- [x] Hosting

**Configuration:**
- Use existing project → Select your project
- Firestore rules: `firestore.rules` (already created)
- Functions language: **JavaScript**
- ESLint: Yes
- Install dependencies: Yes
- Public directory: `dist`
- Single-page app: **Yes**
- Automatic builds: No

### Get Firebase Config

1. Go to Firebase Console → Project Settings (⚙️ icon)
2. Scroll to "Your apps" → Click **Web** icon (</>)
3. Register app name: "PathFinder Web"
4. Copy the `firebaseConfig` object

### Create .env File

```bash
# In project root
cp .env.example .env
```

Edit `.env` with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc...
```

---

## Step 3: Configure Gemini API (2 minutes)

### Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the key

### Set Functions Environment Variables

```bash
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"

# Optional: YouTube API
firebase functions:config:set youtube.api_key="YOUR_YOUTUBE_API_KEY"
```

### For Local Testing

Create `functions/.runtimeconfig.json`:

```json
{
  "gemini": {
    "api_key": "YOUR_GEMINI_API_KEY"
  },
  "youtube": {
    "api_key": "YOUR_YOUTUBE_API_KEY"
  }
}
```

> ⚠️ **Important:** Add `.runtimeconfig.json` to `.gitignore`

---

## Step 4: Deploy to Firebase (3 minutes)

### Install Functions Dependencies

```bash
cd functions
npm install
cd ..
```

### Build Frontend

```bash
npm run build
```

### Deploy Everything

```bash
firebase deploy
```

This will deploy:
- ✅ Firestore security rules
- ✅ Cloud Functions (all 6 endpoints)
- ✅ Hosting (your frontend)

### Get Your Live URL

After deployment completes:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project
Hosting URL: https://your-project.web.app
```

---

## Step 5: Test Your Deployment (Optional)

### Test the Live Site

1. Open your Hosting URL
2. Click "Get Started"
3. Complete the quiz
4. Verify recommendations load
5. Test AI Mentor chat

### Check Cloud Functions

```bash
firebase functions:log
```

### Monitor Firestore

Go to Firebase Console → Firestore Database to see data being created.

---

## Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Functions Not Working

```bash
# Check function logs
firebase functions:log

# Verify config
firebase functions:config:get
```

### CORS Issues

Ensure `cors` is installed in functions:
```bash
cd functions
npm install cors
```

---

## Optional Enhancements

### Custom Domain

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS setup instructions

### CI/CD with GitHub Actions

The project includes a GitHub Actions template. To enable:

1. Get Firebase Service Account key:
   ```bash
   firebase login:ci
   ```

2. Add to GitHub Secrets:
   - `FIREBASE_SERVICE_ACCOUNT`
   - `FIREBASE_PROJECT_ID`

3. Push to `main` branch triggers auto-deployment

---

## Environment Variables Summary

### Frontend (.env)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Backend (Firebase Functions Config)
```
gemini.api_key
youtube.api_key (optional)
```

---

## Cost Optimization

### Free Tier Limits

- **Firestore:** 50K reads/day, 20K writes/day
- **Functions:** 2M invocations/month
- **Hosting:** 10GB storage, 360MB/day transfer
- **Gemini API:** Check current pricing at [ai.google.dev](https://ai.google.dev/pricing)

### Tips to Stay Free

1. Cache Gemini API responses in Firestore
2. Implement rate limiting per user
3. Use Firebase emulators for local development
4. Monitor usage in Firebase Console

---

## Update & Redeploy

### Frontend Only

```bash
npm run build
firebase deploy --only hosting
```

### Functions Only

```bash
firebase deploy --only functions
```

### Specific Function

```bash
firebase deploy --only functions:recommendDomain
```

---

## Backup & Recovery

### Export Firestore Data

```bash
gcloud firestore export gs://your-bucket/backups
```

### Rollback Deployment

```bash
firebase hosting:channel:deploy preview
```

---

## Support & Monitoring

### Firebase Console Dashboards

- **Usage:** Monitor API calls and bandwidth
- **Functions:** Check execution times and errors
- **Firestore:** View database queries
- **Performance:** Track page load times

### Set Up Alerts

1. Go to Firebase Console → Alerts
2. Create alerts for:
   - High API usage
   - Function errors
   - Security rule violations

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Seed initial domain data in Firestore
3. ✅ Monitor Gemini API usage
4. ✅ Set up custom domain (optional)
5. ✅ Enable user authentication (Phase 5)
6. ✅ Populate resource library
7. ✅ Add analytics (Google Analytics 4)

---

## Quick Reference Commands

```bash
# Local development
npm run dev                          # Frontend dev server
firebase emulators:start            # Backend emulators

# Deployment
npm run build && firebase deploy    # Full deployment
firebase deploy --only hosting      # Frontend only
firebase deploy --only functions    # Backend only

# Monitoring
firebase functions:log              # View function logs
firebase hosting:channel:list       # List hosting channels

# Configuration
firebase functions:config:get       # View config
firebase use --add                  # Add another project
```

---

## Emergency Commands

### Rollback
```bash
firebase hosting:channel:deploy rollback
```

### Disable Function
```bash
# Temporarily remove from functions/index.js
firebase deploy --only functions
```

### Clear Firestore
```bash
# Use Firebase Console → Firestore → Delete collection
```

---

**🎉 Congratulations! Your PathFinder platform is now live!**

Share your Hosting URL with engineering students and start helping them find their perfect domain.

For questions or issues, check the [README.md](README.md) or open a GitHub issue.
