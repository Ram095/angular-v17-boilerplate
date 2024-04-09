import { Action, createReducer, on } from '@ngrx/store';
import { CounterState } from '../../../models/counter.model';
import {
  changeCounterName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.action';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + +action.count,
    };
  }),
  on(changeCounterName, (state, action) => {
    return {
      ...state,
      counterName: action.text,
    };
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
