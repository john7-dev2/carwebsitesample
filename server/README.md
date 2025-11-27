# Revelro Backend Server

Backend API server for vehicle history checks using RegCheck API.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET http://localhost:3001/health
```

### Vehicle History Check
```
POST http://localhost:3001/api/vehicle-history
Content-Type: application/json

{
  "vehicleNumber": "DL01AB1234"
}
```

## Configuration

- **Port**: 3001 (configurable in server.js)
- **RegCheck Username**: kutti (hardcoded in server.js)
- **CORS**: Enabled for all origins (restrict in production)

## Notes

- The server runs on port 3001 to avoid conflicts with Vite dev server (port 5173)
- Make sure to run both frontend (Vite) and backend (Express) servers simultaneously
- In production, consider using environment variables for sensitive data
