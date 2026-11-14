# Linux Router Management Interface

A lightweight web-based management interface for Linux routers built with Angular frontend and Node.js/Express backend.

## Features

- **System Status**: View uptime, CPU, memory, and load average
- **Network Interfaces**: Manage network interfaces (up/down)
- **Routes**: View and manage routing table
- **Firewall**: Manage iptables rules and NAT
- **DHCP**: View DHCP leases and configuration
- **DNS**: Manage DNS configuration and hosts file
- **Traffic Monitoring**: View network traffic statistics and active connections

## Architecture

- **Frontend**: Angular (standalone components)
- **Backend**: Node.js + Express
- **Communication**: REST API over HTTP
- **Commands**: Direct system command execution (ip, iptables, etc.)

## Prerequisites

- Node.js v18+ and npm
- Linux system with:
  - `ip` command (iproute2)
  - `iptables`
  - `ss` or `netstat`
  - Optional: `dnsmasq` for DHCP functionality
  - Optional: `ifstat` for bandwidth monitoring

## Installation

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install

# Disable Angular analytics prompt (recommended)
npx ng analytics disable
```

### 2. Running the Application

#### Start Backend API (Terminal 1)
```bash
cd backend
npm start
# Server runs on http://localhost:3000
```

#### Start Frontend Dev Server (Terminal 2)
```bash
cd frontend
npm start
# Frontend runs on http://localhost:4200
```

#### Access the Application
Open your browser and navigate to `http://localhost:4200`

## Important Security Notes

⚠️ **This application executes system commands with elevated privileges. It should only be deployed in trusted environments.**

### Production Deployment Recommendations:

1. **Authentication**: Add user authentication (JWT, OAuth, etc.)
2. **Authorization**: Implement role-based access control
3. **HTTPS**: Use TLS/SSL for encrypted communication
4. **Input Validation**: Add strict validation for all user inputs
5. **Command Whitelisting**: Restrict allowed commands and parameters
6. **Audit Logging**: Log all system command executions
7. **Rate Limiting**: Prevent abuse of system commands
8. **Firewall**: Restrict API access to trusted networks
9. **Run with minimal privileges**: Use sudo for specific commands only
10. **Reverse Proxy**: Use nginx/apache as reverse proxy

### Running with Sudo (if needed)

Some commands require root privileges. You can:

1. Run the backend with sudo: `sudo npm start`
2. Configure specific commands in `/etc/sudoers` for the user running the app
3. Use capabilities for specific binaries (e.g., `setcap` for network operations)

Example sudoers entry for specific commands:
```
routeruser ALL=(ALL) NOPASSWD: /usr/sbin/ip
routeruser ALL=(ALL) NOPASSWD: /usr/sbin/iptables
```

## API Endpoints

### System
- `GET /api/system/status` - Get system status (uptime, CPU, memory, load)

### Network Interfaces
- `GET /api/network/interfaces` - List all network interfaces
- `POST /api/network/interfaces/:name/up` - Bring interface up
- `POST /api/network/interfaces/:name/down` - Bring interface down

### Routes
- `GET /api/network/routes` - List routing table
- `POST /api/network/routes` - Add route
- `DELETE /api/network/routes` - Delete route

### Firewall
- `GET /api/firewall/rules` - List iptables rules
- `GET /api/firewall/nat` - List NAT rules
- `POST /api/firewall/rules` - Add firewall rule
- `DELETE /api/firewall/rules` - Delete firewall rule

### DHCP
- `GET /api/dhcp/leases` - View DHCP leases
- `GET /api/dhcp/config` - View DHCP configuration

### DNS
- `GET /api/dns/config` - View DNS configuration
- `GET /api/dns/hosts` - View hosts file

### Traffic
- `GET /api/traffic/stats` - Get traffic statistics
- `GET /api/traffic/connections` - List active connections
- `GET /api/traffic/bandwidth` - Get bandwidth usage

## Development

### Backend Development
The backend uses Node.js watch mode for auto-reload:
```bash
cd backend
npm run dev
```

### Frontend Development
Angular CLI provides hot reload by default:
```bash
cd frontend
npm start
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   └── server.js          # Express API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/    # Angular components
│   │       ├── services/      # API service
│   │       └── app.routes.ts  # Routing configuration
│   └── package.json
└── README.md
```

## Next Steps

1. Implement remaining component logic (interfaces, routes, firewall, etc.)
2. Add error handling and user feedback (toasts/notifications)
3. Add authentication and authorization
4. Implement real-time updates (WebSocket/SSE)
5. Add charts/graphs for traffic monitoring
6. Create configuration management UI
7. Add backup/restore functionality
8. Implement activity logging

## Troubleshooting

### Angular analytics prompt interrupts startup
If Angular CLI prompts about sharing analytics data:
```bash
cd frontend
npx ng analytics disable
```

This should already be done during installation, but if you encounter the prompt:
- Answer with `N` (No) or press Ctrl+C
- Run the command above to disable it permanently
- Restart the frontend server

To disable globally for all Angular projects:
```bash
npx ng analytics disable --global
```

### Backend can't execute commands
- Ensure the user running the backend has appropriate permissions
- Check if required commands are installed and in PATH
- Review system logs for permission errors

### CORS errors
- The backend is configured to allow all origins in development
- For production, update the CORS configuration in `backend/src/server.js`

### Port conflicts
- Backend default port: 3000
- Frontend default port: 4200
- Change ports in respective configuration files if needed

## License

MIT
