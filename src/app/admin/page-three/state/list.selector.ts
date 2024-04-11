import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../../../models/post.model';

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostsById = (id: any) =>
  createSelector(getPostsState, (state: PostState) =>
    id ? state.posts.find((post) => post.id === id) : null
  );
