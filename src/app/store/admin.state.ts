import { combineReducers } from '@ngrx/store';
import { postsReducer } from '../admin/page-three/state/list.reducer';
import { counterReducer } from '../admin/page-two/state/counter.reducer';
import { CounterState } from '../models/counter.model';
import { PostState } from '../models/post.model';

export interface AdminState {
  counter: CounterState;
  posts: PostState;
}

export const adminReducer = combineReducers<AdminState>({
  counter: counterReducer,
  posts: postsReducer,
});
