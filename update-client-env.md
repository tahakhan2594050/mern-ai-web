# 🔧 UPDATE CLIENT ENVIRONMENT

## BEFORE DEPLOYING CLIENT:

You need to update the client's environment variable with your actual server URL.

### **STEP 1: Get Your Server URL**
From your previous server deployment, copy the URL (something like):
`https://mern-ai-server-xyz123.vercel.app`

### **STEP 2: Update Client Environment**
Replace the placeholder in `client/.env`:

**CHANGE FROM:**
```
VITE_BASE_URL=https://your-project-name.vercel.app
```

**CHANGE TO:**
```
VITE_BASE_URL=https://[YOUR-ACTUAL-SERVER-URL].vercel.app
```

### **STEP 3: Commit Changes**
```bash
git add .
git commit -m "Update client environment with server URL"
git push origin main
```

### **STEP 4: Deploy Client**
Follow the client deployment guide.

## 🎯 EXAMPLE:
If your server is at: `https://mern-ai-server-abc123.vercel.app`
Then update to: `VITE_BASE_URL=https://mern-ai-server-abc123.vercel.app`