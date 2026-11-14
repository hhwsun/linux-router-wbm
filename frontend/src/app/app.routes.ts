import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { SystemStatus } from './components/system-status/system-status';
import { NetworkInterfaces } from './components/network-interfaces/network-interfaces';
import { Routes as RoutesComponent } from './components/routes/routes';
import { Firewall } from './components/firewall/firewall';
import { Dhcp } from './components/dhcp/dhcp';
import { Dns } from './components/dns/dns';
import { Traffic } from './components/traffic/traffic';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'system', component: SystemStatus },
  { path: 'interfaces', component: NetworkInterfaces },
  { path: 'routes', component: RoutesComponent },
  { path: 'firewall', component: Firewall },
  { path: 'dhcp', component: Dhcp },
  { path: 'dns', component: Dns },
  { path: 'traffic', component: Traffic }
];
