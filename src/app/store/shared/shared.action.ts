import { createAction, props } from '@ngrx/store';

export const startLoading = createAction(
  'startLoading',
  props<{ loadingState: boolean }>()
);

export const setError = createAction('setError', props<{ message: string }>());
