import { collection, query, where, orderBy, limit, startAfter, getDocs, DocumentSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../../firebase';
import { Post, PostCategory } from '../../types';

export const fetchPosts = async (category: PostCategory | null = null, lastDoc?: DocumentSnapshot) => {
  try {
    const postsRef = collection(db, 'posts');
    const queryConstraints: QueryConstraint[] = [];

    // Add category filter if specified
    if (category) {
      queryConstraints.push(where('category', '==', category));
    }

    // Add ordering
    queryConstraints.push(orderBy('createdAt', 'desc'));

    // Add pagination
    queryConstraints.push(limit(20));

    // Add startAfter for pagination
    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    // Create and execute query
    const baseQuery = query(postsRef, ...queryConstraints);
    const snapshot = await getDocs(baseQuery);

    // Map results
    const posts = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Post[];

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};