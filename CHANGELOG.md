# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed (2026-06-08)
- **Critical: Frontend "Loading..." issue** - Fixed Angular 22 change detection not triggering after async operations
  - Added `zone.js` package dependency
  - Added `import 'zone.js'` in `main.ts`
  - Added `provideZoneChangeDetection()` in `app.config.ts`
  - Added manual `ChangeDetectorRef.detectChanges()` calls in Dashboard, System Status, and Network Interfaces components
  - Impact: All pages were stuck on "Loading..." even though API calls succeeded
  - Root cause: Angular 22 requires explicit zone-based change detection configuration

### Added
- **TROUBLESHOOTING.md** - Comprehensive troubleshooting guide for common issues
- Documentation updates in README.md, QUICK_START.md, and frontend/README.md

## Initial Release

### Features
- Backend API with endpoints for:
  - System status monitoring
  - Network interface management
  - Route management
  - Firewall/iptables configuration
  - DHCP lease viewing
  - DNS configuration
  - Traffic monitoring
- Frontend Angular application with:
  - Dashboard page
  - System Status page with auto-refresh
  - Network Interfaces page with control actions
  - Scaffolded pages for Routes, Firewall, DHCP, DNS, Traffic
- Mock mode for safe testing without executing real system commands
- Docker support for isolated testing
