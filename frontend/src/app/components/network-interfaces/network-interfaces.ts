import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-network-interfaces',
  imports: [CommonModule],
  templateUrl: './network-interfaces.html',
  styleUrl: './network-interfaces.css',
})
export class NetworkInterfaces implements OnInit {
  interfaces: any[] = [];
  loading = true;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadInterfaces();
  }

  loadInterfaces() {
    this.loading = true;
    this.api.getNetworkInterfaces().subscribe({
      next: (data) => {
        this.interfaces = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading interfaces:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setInterfaceState(name: string, state: 'up' | 'down') {
    const action = state === 'up'
      ? this.api.setInterfaceUp(name)
      : this.api.setInterfaceDown(name);

    action.subscribe({
      next: () => {
        this.loadInterfaces();
      },
      error: (error) => {
        console.error(`Error setting interface ${name} ${state}:`, error);
        alert(`Failed to set interface ${name} ${state}`);
      }
    });
  }

  getAddresses(iface: any): string {
    if (!iface.addr_info || !Array.isArray(iface.addr_info)) {
      return 'N/A';
    }
    return iface.addr_info.map((addr: any) => `${addr.local}/${addr.prefixlen}`).join(', ');
  }
}
