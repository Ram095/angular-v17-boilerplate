# AngularBoilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

With v17, the ng generate command the components, views and pipes created are standalone by default.

The boilerplate project includes the following:

1. Standalone components
2. Lazy-loading
3. AG-Grid with CRUD operation
4. Mockoon for creating mock api's
5. Eslint
6. Template driven form
7. Reactive form
8. Ng-Bootstrap
9. Bootstrap icons
10. Internationalization example using ngx-translate

Some new syntax or features in Angular 17:

1. Similar to JavaScript’s for...of loops, Angular provides the @for block for rendering repeated elements.

@for (user of users; track user.id) {
{{ user.name }}
} @empty {
Empty list of users
}

// Before

```
<li *ngFor="let user of users; index as i; first as isFirst">
  {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
</li>
```

We often see performance problems in apps due to the lack of trackBy function in \*ngFor. A few differences in @for are that track is mandatory to ensure fast diffing performance. The built-in @for loop also has a shortcut for collections with zero items via an optional @empty block.

# Requirements

Node > 18
npm
git
mockoon (https://mockoon.com/)

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
