import { PostState } from '../../../models/post.model';

export const initialState: PostState = {
  posts: [
    {
      id: 1,
      title: 'Sample 1',
      description: 'Sample Description 1',
    },
    {
      id: 2,
      title: 'Sample 2',
      description: 'Sample Description 2',
    },
  ],
};
