# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Prerequisites

This Angular 22 application requires:
- **zone.js** - For change detection (installed as dependency)
- **Zone-based change detection** - Configured in `src/app/app.config.ts`

## Development server

To start a local development server, run:

```bash
npm install  # First time only
npm start    # or: ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Important: Angular 22 Change Detection

This project uses zone-based change detection. All components that load data asynchronously include manual change detection triggers:

```typescript
import { ChangeDetectorRef } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

loadData() {
  this.api.getData().subscribe({
    next: (data) => {
      this.data = data;
      this.cdr.detectChanges(); // Required for UI updates
    }
  });
}
```

**If you see "Loading..." indefinitely**, see [TROUBLESHOOTING.md](../TROUBLESHOOTING.md).

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
