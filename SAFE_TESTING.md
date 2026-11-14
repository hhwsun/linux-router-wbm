# 🛡️ Safe Testing - Start Here!

## The Problem

This application executes system commands like `ip`, `iptables`, and `ss` that can modify your network configuration. Testing on your host system could accidentally change your network settings.

## The Solution

We've implemented **3 safe testing methods** so you can develop and test without any risk to your system.

---

## ⭐ Method 1: Mock Mode (SAFEST)

**Best for:** UI development, frontend work, learning the interface

### What It Does
- Returns fake/simulated data
- **NO system commands are executed**
- Works on ANY operating system (Linux, Mac, Windows)
- Zero risk to your system

### How to Use
```bash
# Install dependencies (first time only)
cd backend && npm install
cd ../frontend && npm install
cd ..

# Start in mock mode
./start-mock.sh
```

You'll see:
```
⚠️  MOCK MODE ENABLED - No real system commands will be executed
```

### What You Get
- ✅ 3 network interfaces (lo, eth0, wlan0) with fake IPs
- ✅ Fake routing table
- ✅ Fake iptables rules
- ✅ Fake DHCP leases
- ✅ Fake system stats
- ✅ Everything looks and works like the real thing!

### Try It
1. Run `./start-mock.sh`
2. Open http://localhost:4200
3. Click around - everything works!
4. Click "Bring Up/Down" on interfaces - **nothing happens to your real network**
5. View firewall rules, routes, etc. - all fake data

**This is the recommended way to start!** 🎉

---

## 🐳 Method 2: Docker Container (ISOLATED)

**Best for:** Testing with real commands, integration testing

### What It Does
- Runs the backend in an isolated Linux container
- Real commands execute **inside the container only**
- Container has its own network stack
- Your host system is completely protected

### Prerequisites
- Docker installed
- Docker Compose installed

### How to Use
```bash
# Start container
docker-compose -f docker-compose.test.yml up --build

# Access http://localhost:4200
```

### What You Get
- ✅ Real Linux environment
- ✅ Real `ip`, `iptables`, `ss` commands
- ✅ Changes affect only the container
- ✅ Easy to reset (just restart container)

### Stop & Clean Up
```bash
# Stop
docker-compose -f docker-compose.test.yml down

# Stop and remove everything
docker-compose -f docker-compose.test.yml down -v --rmi all
```

---

## 💻 Method 3: Virtual Machine (FULL ISOLATION)

**Best for:** Final testing, production validation

### What It Does
- Runs everything in a full Ubuntu VM
- Complete Linux environment
- Total isolation from host

### Prerequisites
- VirtualBox installed
- Vagrant installed

### How to Use
```bash
# Start VM (first time takes ~5 minutes)
vagrant up

# SSH into VM
vagrant ssh

# Inside VM, run the app
cd router-app
./start-dev.sh
```

### Access
Ports are forwarded from VM to host:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000

### Clean Up
```bash
# Stop VM
vagrant halt

# Delete VM
vagrant destroy
```

---

## 🚀 Quick Comparison

| Method | Setup Time | Safety | Real Commands | Best For |
|--------|-----------|--------|---------------|----------|
| **Mock Mode** | 30 seconds | ⭐⭐⭐⭐⭐ | No | UI development |
| **Docker** | 2 minutes | ⭐⭐⭐⭐ | Yes (isolated) | Testing features |
| **VM** | 5 minutes | ⭐⭐⭐⭐⭐ | Yes (isolated) | Final validation |

---

## 📋 Step-by-Step: First Time Setup

### 1. Clone and Install (5 minutes)
```bash
cd angular-wbm-linux-router-claude

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install

cd ..
```

### 2. Start in Mock Mode (30 seconds)
```bash
./start-mock.sh
```

### 3. Explore the Interface
Open http://localhost:4200 and click through:
- Dashboard
- System Status
- Network Interfaces
- Other pages

Everything works with fake data! **Your system is 100% safe.**

### 4. Make Changes
Edit frontend components in `frontend/src/app/components/`

Changes auto-reload in the browser!

### 5. When Ready for Real Testing
Stop mock mode (Ctrl+C) and start Docker:
```bash
docker-compose -f docker-compose.test.yml up
```

---

## ❓ FAQ

### Q: Can I test on my Windows/Mac laptop?
**A:** Yes! Mock mode works on any OS. For real command testing, use Docker or VM.

### Q: Will mock mode affect my network?
**A:** No! Mock mode executes ZERO system commands. It's 100% safe.

### Q: How do I know I'm in mock mode?
**A:** You'll see this message when the backend starts:
```
⚠️  MOCK MODE ENABLED - No real system commands will be executed
```

### Q: Can I switch between mock and real mode?
**A:** Yes! Just stop the server and restart with or without `MOCK_MODE=true`

### Q: What if I accidentally run in production mode?
**A:** The app only reads data by default. Write operations (bringing interfaces up/down, adding routes) require explicit button clicks, so you won't accidentally change anything.

### Q: Angular asks about analytics when I start the frontend?
**A:** Disable it once:
```bash
cd frontend
npx ng analytics disable
```
This prevents the prompt from appearing. To disable for all Angular projects globally:
```bash
npx ng analytics disable --global
```

---

## 🎯 Recommended Development Workflow

1. **Start with Mock Mode** - Get familiar, develop UI
2. **Move to Docker** - Test real functionality  
3. **Use VM** - Final validation before production
4. **Deploy to Router** - With authentication and security hardened

---

## 🆘 Need Help?

- **Quick Start**: See [QUICK_START.md](QUICK_START.md)
- **Full Testing Guide**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Project Details**: See [PROJECT_SETUP.md](PROJECT_SETUP.md)

---

## ✅ Start Now!

```bash
./start-mock.sh
```

Then open http://localhost:4200 and start exploring! 🚀
