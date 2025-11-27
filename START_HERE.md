# 🚀 Quick Start Guide

## Run the Vehicle History Feature

### Option 1: Using Batch Files (Windows)

1. **Start Backend** (in one terminal):
   - Double-click `start-backend.bat`
   - OR run: `.\start-backend.bat`

2. **Start Frontend** (in another terminal):
   - Double-click `start-frontend.bat`
   - OR run: `.\start-frontend.bat`

### Option 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **Vehicle History Page**: http://localhost:5173/vehicle-history
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## ✅ Test the Feature

1. Go to: http://localhost:5173/vehicle-history
2. Enter a vehicle number: `DL01AB1234`
3. Click "Get History Report"
4. View the results!

## 📚 Full Documentation

See `VEHICLE_HISTORY_SETUP.md` for complete documentation.

## ⚠️ Important Notes

- **Both servers must be running** for the feature to work
- Backend runs on port **3001**
- Frontend runs on port **5173** (default Vite)
- RegCheck API username: `kutti` (configured in `server/server.js`)

## 🐛 Troubleshooting

**"Port already in use" error?**
- Close any other applications using ports 3001 or 5173
- Or change the port in the respective config files

**"Cannot connect to backend" error?**
- Make sure the backend server is running
- Check that it's on http://localhost:3001

**Need help?**
- Check backend terminal for error logs
- Check browser console (F12) for frontend errors
- Review `VEHICLE_HISTORY_SETUP.md`
