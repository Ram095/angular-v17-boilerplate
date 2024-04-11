import { Action, createReducer, on } from '@ngrx/store';
import { PostState } from '../../../models/post.model';
import { addPost, deletePost, updatePost } from './list.action';
import { initialState } from './list.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    const post = { ...action.post };
    post.id = state.posts.length + 1;
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatedPost = state.posts.map((item) => {
      return action.post.id === item.id ? action.post : item;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(deletePost, (state, action) => {
    const deletePost = state.posts.filter((item) => {
      return item.id !== action.id;
    });
    return {
      ...state,
      posts: deletePost,
    };
  })
);

export function postsReducer(state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}
