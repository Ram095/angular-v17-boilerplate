import { combineReducers } from '@ngrx/store';
import { CounterState } from '../models/counter.model';
import { PostState } from '../models/post.model';
import { postsReducer } from './page-three/state/list.reducer';
import { counterReducer } from './page-two/state/counter.reducer';

export interface AdminState {
  counter: CounterState;
  posts: PostState;
}

export const adminReducer = combineReducers<AdminState>({
  counter: counterReducer,
  posts: postsReducer,
});
