import { postsReducer } from '../admin/page-three/state/list.reducer';
import { counterReducer } from '../admin/page-two/state/counter.reducer';
import { CounterState } from '../models/counter.model';
import { PostState } from '../models/post.model';

export interface AppState {
  counter: CounterState;
  posts: PostState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
