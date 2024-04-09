import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../../../models/post.model';
import { AppState } from '../../../store/app.state';

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});
