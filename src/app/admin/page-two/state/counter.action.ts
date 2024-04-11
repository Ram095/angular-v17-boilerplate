import { createAction, props } from '@ngrx/store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customIncrement = createAction(
  'customIncrement',
  props<{ count: number }>()
);
export const changeCounterName = createAction(
  'changeCounterName',
  props<{ text: string }>()
);
