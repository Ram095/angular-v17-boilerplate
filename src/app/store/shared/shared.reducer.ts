import { Action, createReducer, on } from '@ngrx/store';
import { setError, startLoading } from './shared.action';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(startLoading, (state, action) => {
    return {
      ...state,
      showLoading: action.loadingState,
    };
  }),
  on(setError, (state, action) => {
    console.log(action.message);
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function sharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
