# Linux Router Web Management Interface

Web-based management interface for Linux router network services built with Angular and Node.js.

## Features

- 🖥️ **System Status** - Monitor uptime, CPU, memory, and load
- 🌐 **Network Interfaces** - View and control network interfaces
- 🛣️ **Routes** - Manage routing table
- 🔥 **Firewall** - Configure iptables rules and NAT
- 📡 **DHCP** - View DHCP leases and configuration
- 🌍 **DNS** - Manage DNS configuration
- 📊 **Traffic Monitoring** - View network statistics and connections

## Quick Start (Safe Testing)

### Option 1: Mock Mode (⭐ Recommended for First Run)

Test the application **without affecting your system**:

```bash
# Install dependencies (first time only)
cd backend && npm install
cd ../frontend && npm install && npx ng analytics disable
cd ..

# Start in mock mode (safe - no real commands)
./start-mock.sh

# Access http://localhost:4200
```

All data is fake and no system commands are executed! Perfect for development.

### Option 2: Docker (Isolated Testing)

Test with real commands in an isolated container:

```bash
docker-compose -f docker-compose.test.yml up --build

# Access http://localhost:4200
```

### Option 3: Production Mode

⚠️ **Warning**: This executes real system commands!

```bash
./start-dev.sh

# Access http://localhost:4200
```

## Documentation

- **[QUICK_START.md](QUICK_START.md)** - Installation and running
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Safe testing options (Mock/Docker/VM)
- **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Detailed setup and security guide
- **[SUMMARY.md](SUMMARY.md)** - Complete project overview

## Architecture

```
┌─────────────┐         HTTP         ┌─────────────┐
│   Angular   │ ◄─────────────────► │   Express   │
│  Frontend   │    REST API (3000)   │   Backend   │
│   (4200)    │                      │             │
└─────────────┘                      └──────┬──────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │ System Cmds   │
                                    │ ip, iptables  │
                                    │ ss, dnsmasq   │
                                    └───────────────┘
```

## Technology Stack

- **Frontend**: Angular 22, TypeScript, RxJS, zone.js
- **Backend**: Node.js, Express
- **Commands**: iproute2, iptables, ss, dnsmasq

## Security Warning

⚠️ **This application executes system commands with elevated privileges.**

**For production deployment, you MUST:**
1. Add authentication (JWT/OAuth)
2. Enable HTTPS/TLS
3. Validate and sanitize all inputs
4. Configure sudo permissions properly
5. Add audit logging
6. Implement rate limiting
7. Restrict network access

See [PROJECT_SETUP.md](PROJECT_SETUP.md) for detailed security guidelines.

## Project Status

✅ Backend API - Complete  
✅ Frontend Structure - Complete  
✅ Dashboard - Implemented  
✅ System Status - Implemented  
✅ Network Interfaces - Implemented  
🔨 Routes - Scaffolded  
🔨 Firewall - Scaffolded  
🔨 DHCP - Scaffolded  
🔨 DNS - Scaffolded  
🔨 Traffic - Scaffolded  

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test using mock mode: `./start-mock.sh`
4. Submit a pull request

## License

MIT

## Need Help?

- **Frontend stuck on "Loading..."?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- See [TESTING_GUIDE.md](TESTING_GUIDE.md) for safe testing options
- See [QUICK_START.md](QUICK_START.md) for basic usage
- Check issues for common problems
