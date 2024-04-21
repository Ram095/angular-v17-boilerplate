# AngularBoilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

With version 17 of Angular CLI, the `ng generate` command creates standalone components, views, and pipes by default.

## Features

1. **Standalone Components:** Components generated are standalone by default.
2. **Lazy Loading:** Utilizes lazy loading for optimized performance.
3. **AG-Grid with CRUD Operations:** Integration of AG-Grid for efficient data management with CRUD operations.
4. **Mockoon for Mock APIs:** Utilizes Mockoon for easily creating mock APIs for development and testing.
5. **Eslint:** Includes ESLint for code quality and style consistency.
6. **Template Driven Form:** Example of a template-driven form.
7. **Reactive Form:** Example of a reactive form implementation.
8. **Ng-Bootstrap:** Integration of Ng-Bootstrap for UI components.
9. **Bootstrap Icons:** Includes Bootstrap icons for enhanced UI design.
10. **Internationalization (i18n) Example:** Demonstrates internationalization using ngx-translate.
11. **NgRx:** Utilizes NgRx for state management.

## Requirements

- Node.js and npm installed.
- Angular CLI version 17.1.2 installed globally (`npm install -g @angular/cli`).
- Mockoon installed for mocking APIs (optional for local development).

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start Mockoon:
   - Download and install [Mockoon](https://mockoon.com/#download).
   - Open Mockoon and create the API's with the data's in assets/json folder (/api/countries and /api/car-details).
   - Start the mock server.
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Troubleshooting

### "EMAIL_NOT_FOUND" Error

If you encounter an "EMAIL_NOT_FOUND" error while signing in, follow these steps:

1. **Verify Email Address:**
   Double-check the email address you are using for signing in. Ensure that it is correctly spelled and matches the email address stored in your authentication system.

2. **Check Authentication System Configuration**:
   Verify that your Firebase project is properly configured, and the authentication method (email/password) is enabled. Make sure that the email address exists in the authentication system.

## Additional Notes

- Make sure to update the environment files with appropriate configurations.
- Customize and extend components, services, and modules to fit your project requirements.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
