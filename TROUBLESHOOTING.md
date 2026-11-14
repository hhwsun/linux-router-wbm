# Troubleshooting Guide

## Common Issues and Solutions

### Frontend Stuck on "Loading..." (Angular 22 Change Detection Issue)

**Symptoms:**
- Web page displays "Loading..." indefinitely on all pages (Dashboard, System Status, Network Interfaces)
- Backend API responds correctly when tested with curl
- Browser console shows no JavaScript errors
- API requests return 200 OK but UI never updates

**Root Causes:**
This issue occurs with Angular 22 due to missing change detection configuration. Angular 22+ requires explicit setup for zone-based change detection.

**Solution:**

1. **Install zone.js dependency** (if missing):
   ```bash
   cd frontend
   npm install zone.js
   ```

2. **Import zone.js in main.ts** (should be the first import):
   ```typescript
   import 'zone.js';
   import { bootstrapApplication } from '@angular/platform-browser';
   // ... rest of imports
   ```

3. **Enable zone-based change detection in app.config.ts**:
   ```typescript
   import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       provideZoneChangeDetection({ eventCoalescing: true }),
       // ... other providers
     ]
   };
   ```

4. **Add manual change detection in components** (if automatic detection still doesn't work):
   ```typescript
   import { Component, ChangeDetectorRef } from '@angular/core';
   
   export class MyComponent {
     constructor(private cdr: ChangeDetectorRef) {}
     
     loadData() {
       this.api.getData().subscribe({
         next: (data) => {
           this.data = data;
           this.loading = false;
           this.cdr.detectChanges(); // Manually trigger change detection
         }
       });
     }
   }
   ```

**Components Updated:**
- `frontend/src/app/components/dashboard/dashboard.ts`
- `frontend/src/app/components/system-status/system-status.ts`
- `frontend/src/app/components/network-interfaces/network-interfaces.ts`

**Why This Happens:**
Angular 22 moved towards zoneless change detection by default. Without explicit zone configuration, async operations (HTTP requests, setTimeout, etc.) don't trigger Angular's change detection mechanism, causing the UI to never update even though the data is loaded.

---

### Backend Not Running

**Symptoms:**
- Frontend shows "Loading..." or connection errors
- Port 3000 is not listening

**Check if backend is running:**
```bash
ss -nlt | grep 3000
# or
curl http://localhost:3000/api/health
```

**Solution:**
```bash
cd backend
MOCK_MODE=true node src/server.js
# or
npm start
```

---

### Frontend Dev Server Not Running

**Symptoms:**
- Cannot access http://localhost:4200
- Port 4200 is not listening

**Check if frontend is running:**
```bash
ss -nlt | grep 4200
```

**Solution:**
```bash
cd frontend
npm start
```

---

### Port Already in Use

**Symptoms:**
```
Error: Port 4200 is already in use
Error: Port 3000 is already in use
```

**Find and kill the process:**
```bash
# Find process using the port
lsof -ti:4200
lsof -ti:3000

# Kill the process
pkill -f "ng serve"
pkill -f "node src/server.js"
```

**Or use different ports:**
```bash
# Frontend
cd frontend
ng serve --port 4300

# Backend - edit server.js to change PORT constant
```

---

### CORS Errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Check:**
1. Backend is running: `curl http://localhost:3000/api/health`
2. Backend has CORS enabled (should be by default in `server.js`)
3. Frontend is making requests to correct URL

**Backend CORS configuration** (in `backend/src/server.js`):
```javascript
const cors = require('cors');
app.use(cors()); // Allow all origins
```

---

### Missing Dependencies

**Symptoms:**
```
Cannot find module 'zone.js'
Cannot find module 'express'
```

**Solution:**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

### Angular CLI Errors

**Symptoms:**
```
An unhandled exception occurred
The specified command requires to be run in an Angular project
```

**Solution:**
Make sure you're in the frontend directory:
```bash
cd frontend
npm start
```

---

### Permission Denied for System Commands

**Symptoms:**
Backend API returns errors when trying to execute system commands (ip, iptables, etc.)

**Solution for development:**
```bash
cd backend
MOCK_MODE=true node src/server.js  # Use mock data instead
```

**Solution for production:**
Configure sudo permissions or run with appropriate privileges (not recommended for development).

---

## Debugging Tips

### Check both servers are running:
```bash
ss -nlt | grep -E ":(3000|4200)"
```

Expected output:
```
LISTEN 0  511  0.0.0.0:4200  0.0.0.0:*
LISTEN 0  511  0.0.0.0:3000  0.0.0.0:*
```

### Test backend API directly:
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/system/status
curl http://localhost:3000/api/network/interfaces
```

### Check browser console:
1. Open http://localhost:4200 in browser
2. Press F12 to open Developer Tools
3. Check Console tab for JavaScript errors
4. Check Network tab to see if API requests are being made

### Check Angular change detection:
Open browser console and run:
```javascript
typeof Zone !== 'undefined'  // Should return true
typeof ng !== 'undefined'    // Should return true
```

---

## Getting Help

If you encounter issues not covered here:

1. Check the browser console for errors (F12)
2. Check backend logs in the terminal
3. Verify both servers are running
4. Test the backend API with curl
5. Try restarting both servers
6. Clear browser cache and reload
7. Check package.json dependencies are installed

For the "Loading..." issue specifically, ensure all three fixes are applied:
- ✅ zone.js installed and imported
- ✅ provideZoneChangeDetection() in app.config.ts  
- ✅ ChangeDetectorRef.detectChanges() in component subscribe callbacks
