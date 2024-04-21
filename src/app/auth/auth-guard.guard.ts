import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { isAuthenticated } from './state/auth.selector';

export const authGuardGuard: CanActivateFn = (route, segments) => {
  const router = inject(Router);
  const authStore = inject(Store);
  const authService = inject(AuthService);
  const currentUser = authService.getCurrentUserValue();
  if (currentUser) {
    return true;
  } else {
    return router.createUrlTree(['/auth/login']);
  }
  // return authStore.select(isAuthenticated).pipe(
  //   map((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       return true;
  //     } else {
  //       return router.createUrlTree(['/auth/login']);
  //     }
  //   })
  // );
};
