import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Use the same host as the frontend, but port 3000
    // This allows access from remote browsers
    const hostname = window.location.hostname;
    this.apiUrl = `http://${hostname}:3000/api`;
  }

  // System Status
  getSystemStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/system/status`);
  }

  // Network Interfaces
  getNetworkInterfaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/network/interfaces`);
  }

  setInterfaceUp(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/network/interfaces/${name}/up`, {});
  }

  setInterfaceDown(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/network/interfaces/${name}/down`, {});
  }

  // Routes
  getRoutes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/network/routes`);
  }

  addRoute(destination: string, gateway?: string, device?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/network/routes`, { destination, gateway, device });
  }

  deleteRoute(destination: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/network/routes`, {
      body: { destination }
    });
  }

  // Firewall
  getFirewallRules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/firewall/rules`);
  }

  getNatRules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/firewall/nat`);
  }

  addFirewallRule(chain: string, rule: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/firewall/rules`, { chain, rule });
  }

  deleteFirewallRule(chain: string, rulenum: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/firewall/rules`, {
      body: { chain, rulenum }
    });
  }

  // DHCP
  getDhcpLeases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dhcp/leases`);
  }

  getDhcpConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dhcp/config`);
  }

  // DNS
  getDnsConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dns/config`);
  }

  getDnsHosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dns/hosts`);
  }

  // Traffic Monitoring
  getTrafficStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traffic/stats`);
  }

  getConnections(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traffic/connections`);
  }

  getBandwidth(iface?: string): Observable<any> {
    const params: any = iface ? { interface: iface } : undefined;
    return this.http.get(`${this.apiUrl}/traffic/bandwidth`, params ? { params } : {});
  }
}
