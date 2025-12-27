# Server Deployment Guide for Vercel - WORKING VERSION

## ✅ CURRENT STATUS: MINIMAL WORKING SERVER

The server is now configured with a minimal, serverless-compatible setup that should deploy successfully on Vercel.

## 🚀 Quick Deploy Steps:

1. **Push to GitHub**: Commit and push all changes
2. **Vercel Setup**:
   - Connect your GitHub repo to Vercel
   - Set **Root Directory** to `server`
   - Add environment variables (see below)
   - Deploy!

## 🔧 Environment Variables (Add these in Vercel Dashboard):

```
DATABASE_URL=your_neon_database_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_API_KEY=your_google_api_key
NODE_ENV=production
```

## 📋 What's Working Now:

- ✅ Basic Express server with CORS
- ✅ Health check endpoints: `/` and `/health`
- ✅ Test endpoint: `/api/test`
- ✅ Proper error handling
- ✅ Serverless-compatible structure
- ✅ No problematic dependencies (Canvas removed)

## 🔄 Next Steps After Deployment:

Once the basic server is deployed and working:

1. **Test the deployment**: Visit your Vercel URL
2. **Verify endpoints**: Check `/health` and `/api/test`
3. **Add authentication**: Gradually add Clerk middleware
4. **Add routes**: Integrate AI, user, and admin routes one by one

## 🐛 If Still Having Issues:

1. Check Vercel function logs in dashboard
2. Verify all environment variables are set
3. Make sure root directory is set to `server`
4. Check that Node.js version is compatible

## 📁 Current File Structure:
```
server/
├── index.js (main entry point)
├── server.js (full version - backup)
├── vercel.json (deployment config)
├── package.json (dependencies)
└── ... (other files)
```

The minimal `index.js` should deploy without issues. Once working, we can gradually add back the full functionality.