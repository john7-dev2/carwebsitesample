# Deployment Guide

## Backend Deployment (Choose One)

### Option 1: Deploy to Render (Recommended - Free Tier)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `carwebsite-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `REGCHECK_USERNAME`: `jou1`
   - `FRONTEND_URL`: `https://carwebsitesample.vercel.app`
6. Click "Create Web Service"
7. Copy the deployed URL (e.g., `https://carwebsite-backend.onrender.com`)

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `server`
   - Add environment variables as above
5. Copy the deployed URL

### Option 3: Deploy to Heroku

1. Install Heroku CLI
2. Run:
   ```bash
   cd server
   heroku create carwebsite-backend
   heroku config:set REGCHECK_USERNAME=jou1
   heroku config:set FRONTEND_URL=https://carwebsitesample.vercel.app
   git subtree push --prefix server heroku main
   ```

## Frontend Deployment (Vercel)

### Update Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project: `carwebsitesample`
3. Go to Settings → Environment Variables
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://carwebsite-backend.onrender.com`)
   - **Environment**: Production, Preview, Development
5. Click "Save"
6. Go to Deployments → Click "..." → "Redeploy"

## Testing

1. Visit your Vercel URL: `https://carwebsitesample.vercel.app`
2. Navigate to "Vehicle History" page
3. Enter a test vehicle number
4. Check if the API call succeeds

## Troubleshooting

### CORS Errors
- Make sure your Vercel URL is added to `allowedOrigins` in `server/server.js`
- Redeploy the backend after changes

### Connection Refused
- Verify backend is running: Visit `https://your-backend-url/health`
- Check environment variable `VITE_API_URL` is set correctly in Vercel

### API Errors
- Check backend logs in Render/Railway/Heroku dashboard
- Verify `REGCHECK_USERNAME` environment variable is set

## Local Development

Create `.env` file in root:
```
VITE_API_URL=http://localhost:3001
```

Create `.env` file in `server/`:
```
REGCHECK_USERNAME=jou1
PORT=3001
```

Run:
```bash
# Terminal 1 - Backend
cd server
npm install
node server.js

# Terminal 2 - Frontend
npm install
npm run dev
```
