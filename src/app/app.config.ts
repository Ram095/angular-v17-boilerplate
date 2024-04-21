import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideToastr, ToastNoAnimationModule } from 'ngx-toastr';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { appReducer } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    importProvidersFrom(
      HttpClientModule,
      EffectsModule.forRoot({}),
      StoreModule.forRoot(appReducer),
      StoreDevtoolsModule.instrument({
        logOnly: environment.production,
      }),
      ToastNoAnimationModule.forRoot()
    ),
  ],
};
