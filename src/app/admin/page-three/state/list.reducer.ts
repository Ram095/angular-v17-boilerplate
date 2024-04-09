import { Action, createReducer } from '@ngrx/store';
import { PostState } from '../../../models/post.model';
import { initialState } from './list.state';

const _postsReducer = createReducer(initialState);

export function postsReducer(state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}
