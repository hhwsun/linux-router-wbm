const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();
const PORT = 3000;

// Mock mode - set MOCK_MODE=true to test without executing real commands
const MOCK_MODE = process.env.MOCK_MODE === 'true';
const mockData = MOCK_MODE ? require('./mock-data') : null;

if (MOCK_MODE) {
  console.log('⚠️  MOCK MODE ENABLED - No real system commands will be executed');
}

app.use(cors());
app.use(express.json());

// Helper function to execute commands with proper error handling
async function execCommand(command) {
  if (MOCK_MODE) {
    console.log('[MOCK] Would execute:', command);
    return { success: true, data: '', error: '' };
  }

  try {
    const { stdout, stderr } = await execAsync(command);
    return { success: true, data: stdout, error: stderr };
  } catch (error) {
    return { success: false, error: error.message, stderr: error.stderr };
  }
}

// System Status Endpoints
app.get('/api/system/status', async (req, res) => {
  if (MOCK_MODE) {
    return res.json(mockData.mockSystemStatus);
  }

  try {
    const [uptime, memory, cpu, load] = await Promise.all([
      execCommand('uptime -p'),
      execCommand('free -h'),
      execCommand('top -bn1 | grep "Cpu(s)"'),
      execCommand('cat /proc/loadavg')
    ]);

    res.json({
      uptime: uptime.data.trim(),
      memory: memory.data,
      cpu: cpu.data.trim(),
      load: load.data.trim()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Network Interfaces Endpoints
app.get('/api/network/interfaces', async (req, res) => {
  if (MOCK_MODE) {
    return res.json(mockData.mockInterfaces);
  }

  const result = await execCommand('ip -j addr show');
  if (result.success) {
    try {
      const interfaces = JSON.parse(result.data);
      res.json(interfaces);
    } catch (e) {
      res.json({ raw: result.data });
    }
  } else {
    res.status(500).json({ error: result.error });
  }
});

app.post('/api/network/interfaces/:name/up', async (req, res) => {
  const { name } = req.params;
  const result = await execCommand(`ip link set ${name} up`);
  res.json(result);
});

app.post('/api/network/interfaces/:name/down', async (req, res) => {
  const { name } = req.params;
  const result = await execCommand(`ip link set ${name} down`);
  res.json(result);
});

// Routes Endpoints
app.get('/api/network/routes', async (req, res) => {
  if (MOCK_MODE) {
    return res.json(mockData.mockRoutes);
  }

  const result = await execCommand('ip -j route show');
  if (result.success) {
    try {
      const routes = JSON.parse(result.data);
      res.json(routes);
    } catch (e) {
      res.json({ raw: result.data });
    }
  } else {
    res.status(500).json({ error: result.error });
  }
});

app.post('/api/network/routes', async (req, res) => {
  const { destination, gateway, device } = req.body;
  let cmd = `ip route add ${destination}`;
  if (gateway) cmd += ` via ${gateway}`;
  if (device) cmd += ` dev ${device}`;

  const result = await execCommand(cmd);
  res.json(result);
});

app.delete('/api/network/routes', async (req, res) => {
  const { destination } = req.body;
  const result = await execCommand(`ip route del ${destination}`);
  res.json(result);
});

// Firewall Endpoints (iptables)
app.get('/api/firewall/rules', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ rules: mockData.mockFirewallRules, success: true });
  }

  const result = await execCommand('iptables -L -n -v --line-numbers');
  res.json({ rules: result.data, success: result.success });
});

app.get('/api/firewall/nat', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ rules: mockData.mockNatRules, success: true });
  }

  const result = await execCommand('iptables -t nat -L -n -v --line-numbers');
  res.json({ rules: result.data, success: result.success });
});

app.post('/api/firewall/rules', async (req, res) => {
  const { chain, rule } = req.body;
  const result = await execCommand(`iptables -A ${chain} ${rule}`);
  res.json(result);
});

app.delete('/api/firewall/rules', async (req, res) => {
  const { chain, rulenum } = req.body;
  const result = await execCommand(`iptables -D ${chain} ${rulenum}`);
  res.json(result);
});

// DHCP Server Endpoints (dnsmasq)
app.get('/api/dhcp/leases', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ leases: mockData.mockDhcpLeases, success: true });
  }

  const result = await execCommand('cat /var/lib/misc/dnsmasq.leases || cat /var/lib/dnsmasq/dnsmasq.leases');
  res.json({ leases: result.data, success: result.success });
});

app.get('/api/dhcp/config', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ config: mockData.mockDhcpConfig, success: true });
  }

  const result = await execCommand('cat /etc/dnsmasq.conf');
  res.json({ config: result.data, success: result.success });
});

// DNS Endpoints
app.get('/api/dns/config', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ config: mockData.mockDnsConfig, success: true });
  }

  const result = await execCommand('cat /etc/resolv.conf');
  res.json({ config: result.data, success: result.success });
});

app.get('/api/dns/hosts', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ hosts: mockData.mockHosts, success: true });
  }

  const result = await execCommand('cat /etc/hosts');
  res.json({ hosts: result.data, success: result.success });
});

// Traffic Monitoring Endpoints
app.get('/api/traffic/stats', async (req, res) => {
  if (MOCK_MODE) {
    return res.json(mockData.mockTrafficStats);
  }

  const result = await execCommand('ip -j -s link show');
  if (result.success) {
    try {
      const stats = JSON.parse(result.data);
      res.json(stats);
    } catch (e) {
      res.json({ raw: result.data });
    }
  } else {
    res.status(500).json({ error: result.error });
  }
});

app.get('/api/traffic/connections', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ connections: mockData.mockConnections, success: true });
  }

  const result = await execCommand('ss -tunap');
  res.json({ connections: result.data, success: result.success });
});

app.get('/api/traffic/bandwidth', async (req, res) => {
  if (MOCK_MODE) {
    return res.json({ bandwidth: mockData.mockBandwidth, success: true });
  }

  const { interface: iface } = req.query;
  const cmd = iface ? `ifstat -i ${iface} 1 1` : 'ifstat 1 1';
  const result = await execCommand(cmd);
  res.json({ bandwidth: result.data, success: result.success });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Router management API listening on 0.0.0.0:${PORT}`);
  console.log(`Access from remote: http://<your-ip>:${PORT}/api/health`);
});
