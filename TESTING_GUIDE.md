# Testing Guide - Safe Options

This guide shows you how to test the router management interface **without affecting your host system**.

## ⚠️ Warning

**DO NOT** run the backend with sudo on your host system during development unless you're certain about what you're doing. The application executes system commands that can affect network configuration.

---

## Option 1: Mock Mode (Safest - No Real Commands) ⭐

Run the backend in mock mode which returns fake data without executing any system commands.

### Setup
```bash
# Backend with mock mode
cd backend
MOCK_MODE=true npm start
```

You'll see: `⚠️  MOCK MODE ENABLED - No real system commands will be executed`

### Test
```bash
# Frontend (separate terminal)
cd frontend
npm start

# Access http://localhost:4200
# All data is fake, no commands are executed
```

### What Gets Mocked
- ✅ System status (uptime, CPU, memory)
- ✅ Network interfaces (eth0, wlan0, lo with fake IPs)
- ✅ Routes (fake routing table)
- ✅ Firewall rules (fake iptables output)
- ✅ DHCP leases (fake active leases)
- ✅ DNS config (fake resolv.conf and hosts)
- ✅ Traffic stats (fake bandwidth numbers)

### Benefits
- ✅ 100% safe - no system changes possible
- ✅ Works on any OS (Mac, Windows, Linux)
- ✅ No elevated permissions needed
- ✅ Perfect for UI/frontend development
- ✅ Consistent test data

### Try It Now
```bash
# Start in mock mode
cd backend
MOCK_MODE=true npm start &

cd ../frontend
npm start &

# Open http://localhost:4200
# Click through all pages - everything works with fake data
```

---

## Option 2: Docker Container (Isolated Environment)

Run the entire stack in an isolated Docker container with its own network stack.

### Prerequisites
- Docker installed
- Docker Compose installed

### Setup
```bash
# Build and start containers
docker-compose -f docker-compose.test.yml up --build

# Access http://localhost:4200
```

### What Happens
- Backend runs in a container with its own network interfaces
- Commands affect **only the container**, not your host
- Container has NET_ADMIN capabilities for network operations
- Frontend runs in a separate container

### Stop & Clean Up
```bash
# Stop containers
docker-compose -f docker-compose.test.yml down

# Remove volumes and images
docker-compose -f docker-compose.test.yml down -v --rmi all
```

### Benefits
- ✅ Real Linux environment
- ✅ Real system commands execute
- ✅ Completely isolated from host
- ✅ Easy to reset (just restart container)
- ✅ Can test actual iptables, routing, etc.

### Limitations
- Container's network is simulated
- Some operations may behave differently than bare metal
- Requires Docker setup

---

## Option 3: Virtual Machine (Full Isolation)

Run the application in a full Linux VM using Vagrant.

### Prerequisites
- VirtualBox installed
- Vagrant installed

### Setup
```bash
# Start VM
vagrant up

# SSH into VM
vagrant ssh

# Run the application
cd router-app
./start-dev.sh
```

### Access
- Frontend: http://localhost:4200 (forwarded from VM)
- Backend: http://localhost:3000 (forwarded from VM)

### Benefits
- ✅ Full Linux environment
- ✅ Real hardware simulation
- ✅ Multiple network interfaces possible
- ✅ Complete isolation from host
- ✅ Can snapshot/restore VM state

### Clean Up
```bash
# Stop VM
vagrant halt

# Destroy VM
vagrant destroy
```

---

## Option 4: Read-Only Mode (View Only)

For initial testing, just query data without making changes.

### Test These Endpoints Safely
These only **read** data and don't modify anything:

```bash
# System status (safe)
curl http://localhost:3000/api/system/status

# List interfaces (safe)
curl http://localhost:3000/api/network/interfaces

# View routes (safe)
curl http://localhost:3000/api/network/routes

# View firewall rules (safe)
curl http://localhost:3000/api/firewall/rules

# View DHCP leases (safe)
curl http://localhost:3000/api/dhcp/leases

# View traffic stats (safe)
curl http://localhost:3000/api/traffic/stats
```

### In the Frontend
Simply **view** these pages without clicking action buttons:
- Dashboard (view only)
- System Status (view only)
- Network Interfaces (DON'T click Up/Down buttons)
- Other pages (view only)

---

## Comparison Matrix

| Method | Safety | Real Commands | Setup Complexity | Best For |
|--------|--------|---------------|------------------|----------|
| **Mock Mode** | ⭐⭐⭐⭐⭐ | No | ⭐ Easy | UI development |
| **Docker** | ⭐⭐⭐⭐ | Yes (isolated) | ⭐⭐ Medium | Integration testing |
| **VM** | ⭐⭐⭐⭐⭐ | Yes (isolated) | ⭐⭐⭐ Complex | Full system testing |
| **Read-Only** | ⭐⭐⭐ | Yes (read only) | ⭐ Easy | Quick validation |

---

## Recommended Testing Workflow

### Stage 1: UI Development (Mock Mode)
```bash
MOCK_MODE=true npm start  # Backend
npm start                  # Frontend
```
- Develop all UI components
- Test routing and navigation
- Verify data display
- No system risk

### Stage 2: Integration Testing (Docker)
```bash
docker-compose -f docker-compose.test.yml up
```
- Test real API calls
- Verify command execution
- Test error handling
- Isolated environment

### Stage 3: Full Testing (VM or Dedicated Hardware)
```bash
vagrant up && vagrant ssh
```
- Test on real Linux
- Verify all features
- Performance testing
- Final validation

### Stage 4: Production Deployment
- Deploy to actual router hardware
- Add authentication
- Enable HTTPS
- Configure firewall rules
- Set up monitoring

---

## Quick Start Commands

### Mock Mode (Safest)
```bash
cd backend
MOCK_MODE=true npm start
```

### Docker
```bash
docker-compose -f docker-compose.test.yml up
```

### Vagrant
```bash
vagrant up
vagrant ssh
cd router-app && ./start-dev.sh
```

---

## Troubleshooting

### Angular analytics prompt
If Angular CLI asks about sharing analytics data on first run:
```bash
cd frontend
npx ng analytics disable
```

The prompt can interrupt the startup scripts. Disable it once to prevent future prompts.

To disable globally:
```bash
npx ng analytics disable --global
```

### "Commands not found" in container
- The Docker image includes all required tools
- Rebuild: `docker-compose -f docker-compose.test.yml build --no-cache`

### Ports already in use
- Stop existing services on ports 3000 and 4200
- Or change ports in docker-compose.test.yml

### Mock mode data not showing
- Verify `MOCK_MODE=true` is set
- Check console for "MOCK MODE ENABLED" message
- Check `backend/src/mock-data.js` exists

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS settings in server.js
- Check browser console for errors

---

## Next Steps

1. **Start with Mock Mode** for safe UI development
2. **Move to Docker** when you need to test real commands
3. **Use VM** for final testing before production
4. **Never test on production** hardware without backups!

Remember: Mock mode is always available for safe development! 🛡️
