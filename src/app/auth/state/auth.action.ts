import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loginStart = createAction(
  'login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  'loginSuccess',
  props<{ user: User }>()
);
export const loginFailure = createAction('loginFailure');

export const registerStart = createAction(
  'register',
  props<{ email: string; password: string }>()
);

export const registerSuccess = createAction(
  'registerSuccess',
  props<{ user: User }>()
);
