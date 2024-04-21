import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { setError, startLoading } from '../../store/shared/shared.action';
import { AuthService } from '../auth.service';
import {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from './auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(startLoading({ loadingState: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((er) => {
            const error = this.authService.getErrorMessage(
              er.error.error.message
            );
            this.toastrService.error(error, 'Error', {
              timeOut: 3000,
            });
            // this.store.dispatch(setError({ message: error }));
            this.store.dispatch(startLoading({ loadingState: false }));
            return of(setError({ message: error }));
          })
        );
      })
    );
  });

  loginRedirect = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true,
          };
          this.router.navigate(['/admin'], navigationExtras);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(registerStart),
      exhaustMap((action) => {
        return this.authService.register(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(startLoading({ loadingState: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            this.toastrService.success(
              'User account created successfully',
              'Success',
              {
                timeOut: 3000,
              }
            );
            return registerSuccess({ user });
          }),
          catchError((er) => {
            const error = this.authService.getErrorMessage(
              er.error.error.message
            );
            this.toastrService.error(error, 'Error', {
              timeOut: 3000,
            });
            this.store.dispatch(startLoading({ loadingState: false }));
            return of(setError({ message: error }));
          })
        );
      })
    );
  });

  registerRedirect = createEffect(
    () => {
      return this.action$.pipe(
        ofType(registerSuccess),
        tap((action) => {
          this.router.navigate(['/admin']);
        })
      );
    },
    { dispatch: false }
  );
}
