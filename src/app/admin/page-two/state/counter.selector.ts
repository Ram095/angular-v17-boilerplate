import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from '../../../models/counter.model';

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getCounterName = createSelector(getCounterState, (state) => {
  return state.counterName;
});
