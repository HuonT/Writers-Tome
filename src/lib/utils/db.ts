import { collection, query, where, orderBy, limit, startAfter, getDocs, DocumentSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase';
import { Post, PostCategory } from '../types';

export const fetchPosts = async (category: PostCategory | null = null, lastDoc?: DocumentSnapshot) => {
  try {
    const postsRef = collection(db, 'posts');
    const queryConstraints: QueryConstraint[] = [
      orderBy('createdAt', 'desc'),
      limit(20)
    ];

    if (category) {
      queryConstraints.unshift(where('category', '==', category));
    }

    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    const baseQuery = query(postsRef, ...queryConstraints);
    const snapshot = await getDocs(baseQuery);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};