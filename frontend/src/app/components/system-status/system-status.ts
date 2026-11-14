import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-system-status',
  imports: [CommonModule],
  templateUrl: './system-status.html',
  styleUrl: './system-status.css',
})
export class SystemStatus implements OnInit {
  status: any = null;
  loading = true;
  autoRefresh = false;
  refreshInterval: any;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStatus();
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadStatus() {
    this.loading = true;
    this.api.getSystemStatus().subscribe({
      next: (data) => {
        this.status = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading system status:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.refreshInterval = setInterval(() => this.loadStatus(), 5000);
    } else if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}
