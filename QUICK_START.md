# Quick Start Guide

## Installation (First Time Only)

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Disable Angular analytics prompt (prevents startup interruption)
npx ng analytics disable

cd ..
```

## Running the Application

### Option 1: Use the convenience script
```bash
./start-dev.sh
```

### Option 2: Manual start (2 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Access

- **Web Interface**: http://localhost:4200
- **API**: http://localhost:3000

## Testing

### Test Backend API
```bash
# Health check
curl http://localhost:3000/api/health

# System status
curl http://localhost:3000/api/system/status

# Network interfaces
curl http://localhost:3000/api/network/interfaces
```

### Test Frontend
Open http://localhost:4200 in your browser and navigate through:
- Dashboard
- System Status
- Network Interfaces
- Other sections (scaffolded, ready for implementation)

## Stopping the Application

If using `start-dev.sh`:
- Press `Ctrl+C` in the terminal

If running manually:
- Press `Ctrl+C` in each terminal

## Common Issues

### Frontend Stuck on "Loading..."
**Most Common Issue:** If the web page shows "Loading..." indefinitely:
- This is an Angular 22 change detection issue
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md#frontend-stuck-on-loading-angular-22-change-detection-issue) for detailed solution
- Quick fix: Ensure both backend (port 3000) and frontend (port 4200) are running

**Verify servers are running:**
```bash
ss -nlt | grep -E ":(3000|4200)"
```

### Angular Analytics Prompt
If you see a prompt asking about sharing analytics data on startup:
```bash
cd frontend
npx ng analytics disable
```

This has already been disabled in the installation steps above, but if you cloned the repo and didn't run the installation commands, you may see this prompt.

To disable globally (affects all Angular projects):
```bash
npx ng analytics disable --global
```

### Port Already in Use
- Backend (3000): Change port in `backend/src/server.js`
- Frontend (4200): Change port in `frontend/angular.json` or run `ng serve --port 4300`

**Kill existing processes:**
```bash
pkill -f "ng serve"
pkill -f "node src/server.js"
```

### Permission Denied for System Commands
Some commands need elevated privileges:
```bash
# Run backend with sudo (development only!)
cd backend
sudo npm start
```

For production, configure specific sudo permissions in `/etc/sudoers`

### CORS Errors
Backend is configured to allow all origins. If you still see CORS errors:
- Check backend is running on port 3000
- Check frontend is making requests to http://localhost:3000

## Detailed Troubleshooting

For comprehensive troubleshooting information, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Directory Structure

```
.
├── backend/           # Node.js API server
│   ├── src/
│   │   └── server.js
│   └── package.json
├── frontend/          # Angular application
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── package.json
└── start-dev.sh      # Convenience script
```

## What's Implemented

✅ Backend API (all endpoints)
✅ Frontend routing and navigation
✅ Dashboard page
✅ System Status page (with auto-refresh)
✅ Network Interfaces page (view and control)
🔨 Other components (scaffolded, need implementation)

## Next Steps for Development

1. Open the project in your IDE
2. Implement remaining components in `frontend/src/app/components/`
3. Each component already has:
   - Routing configured
   - API service methods available
   - Basic structure in place

## Need Help?

- See `PROJECT_SETUP.md` for detailed documentation
- See `SUMMARY.md` for project overview
- Check `backend/src/server.js` for API endpoints
- Check `frontend/src/app/services/api.service.ts` for available API methods
