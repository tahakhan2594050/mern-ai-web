# 🚀 CLIENT DEPLOYMENT GUIDE FOR VERCEL

## 📋 STEP-BY-STEP CLIENT DEPLOYMENT

### **STEP 1: Update Environment Variables**
First, you need to update the client's environment with your actual server URL.

**Replace `your-project-name` with your actual server URL from the previous deployment.**

### **STEP 2: Go to Vercel**
1. Open [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"** or **"Add New..."** → **"Project"**

### **STEP 3: Import Client Project**
1. Find your repository: **`mern-ai-web`** 
2. Click **"Import"** next to it
3. **IMPORTANT**: This time we're deploying the CLIENT, not the server

### **STEP 4: Configure Client Settings**

#### **Project Name:**
- Change to something like: `mern-ai-client` or `ai-web-app`

#### **Framework Preset:**
- Select **"Vite"** (Vercel should auto-detect this)

#### **Root Directory:**
- Click **"Edit"** next to Root Directory
- Type: **`client`**
- Click **"Continue"**

#### **Build and Output Settings:**
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

### **STEP 5: Add Environment Variables**
Click **"Environment Variables"** and add:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_Zmxvd2luZy1jb2QtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_BASE_URL = https://[YOUR-SERVER-URL].vercel.app
```

**Replace `[YOUR-SERVER-URL]` with your actual server URL from the previous deployment!**

### **STEP 6: Deploy**
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Vercel will build your React app and deploy it

### **STEP 7: Test Your Client**
Once deployed:
1. You'll get a client URL like: `https://mern-ai-client.vercel.app`
2. Open the URL in your browser
3. Test the React application
4. Verify it can communicate with your server

## 🎯 **WHAT YOU SHOULD SEE:**

### **✅ Successful Client Deployment:**
- React app loads without errors
- Routing works (no 404 on page refresh)
- Can communicate with your server API
- Clerk authentication works
- All features functional

### **🔧 Client Configuration Files:**
- ✅ `package.json` - Vite build setup
- ✅ `vercel.json` - SPA routing configuration
- ✅ `.env` - Environment variables
- ✅ Vite configuration ready

## 🌐 **FINAL RESULT:**
After both deployments:
- **Server**: `https://[server-name].vercel.app` (API endpoints)
- **Client**: `https://[client-name].vercel.app` (React app)
- **Full-stack app** working together!

## 🚨 **IMPORTANT NOTES:**
1. **Update VITE_BASE_URL** with your actual server URL
2. **Root Directory** must be set to `client`
3. **Framework** should be Vite (auto-detected)
4. **Test both apps** work together after deployment

Your full-stack application will be live on Vercel! 🎉