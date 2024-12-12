import { Post, PostCategory } from '../types';
import { DocumentSnapshot } from 'firebase/firestore';
import { fetchPosts } from './db';
import { updatePost } from './firestore';

export const loadPostsData = async (
  category: PostCategory | null = null,
  lastDoc?: DocumentSnapshot,
  reset: boolean = false
) => {
  try {
    const newPosts = await fetchPosts(category, reset ? undefined : lastDoc);
    const hasMore = newPosts.length === 20;
    const newLastDoc = newPosts.length > 0 ? newPosts[newPosts.length - 1] as unknown as DocumentSnapshot : undefined;
    
    return { newPosts, hasMore, newLastDoc };
  } catch (error) {
    console.error('Error loading posts:', error);
    throw error;
  }
};

export const updatePostContent = async (
  postId: string,
  title: string,
  content: string,
  category: PostCategory,
  requestingFeedback: boolean,
  posts: Post[]
): Promise<Post[]> => {
  try {
    const updates = {
      title,
      content,
      category,
      requestingFeedback,
      updatedAt: new Date().toISOString()
    };

    await updatePost(postId, updates);
    
    return posts.map(p =>
      p.id === postId
        ? { ...p, ...updates }
        : p
    );
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const updatePostLikes = (
  posts: Post[],
  postId: string,
  newLikes: number
): Post[] => {
  return posts.map(p =>
    p.id === postId ? { ...p, likes: newLikes } : p
  );
};