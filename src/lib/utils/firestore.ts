import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc,
  orderBy,
  limit,
  startAfter,
  increment,
  DocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Project, Post, Comment, UserProfile, PostCategory } from '../types';

// User Operations
export const createUserProfile = async (userProfile: UserProfile) => {
  try {
    const userRef = doc(db, 'users', userProfile.id);
    const userData = {
      ...userProfile,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      isActive: true
    };
    await setDoc(userRef, userData);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Project Operations
export const saveProject = async (project: Project) => {
  try {
    const projectRef = doc(db, 'projects', project.id);
    await setDoc(projectRef, project);
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const getProject = async (projectId: string) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    if (projectSnap.exists()) {
      return projectSnap.data() as Project;
    }
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

export const getAllProjects = async (userId: string) => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Project);
  } catch (error) {
    console.error('Error getting all projects:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Post Operations
export const createPost = async (post: Omit<Post, 'id'>) => {
  try {
    const postsRef = collection(db, 'posts');
    const postDoc = doc(postsRef);
    const newPost = { ...post, id: postDoc.id };
    await setDoc(postDoc, newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId: string, updates: Partial<Post>) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const getPost = async (postId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      return { ...postSnap.data(), id: postSnap.id } as Post;
    }
    return null;
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
};

export const getPosts = async (category: PostCategory | null = null, lastDoc?: DocumentSnapshot) => {
  try {
    const postsRef = collection(db, 'posts');
    let q;

    if (category) {
      q = query(
        postsRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
    } else {
      q = query(
        postsRef,
        orderBy('createdAt', 'desc'),
        limit(20)
      );
    }

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Post);
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Comment Operations
export const createComment = async (comment: Omit<Comment, 'id'>) => {
  try {
    const commentsRef = collection(db, `posts/${comment.postId}/comments`);
    const commentDoc = doc(commentsRef);
    const newComment = { ...comment, id: commentDoc.id };
    await setDoc(commentDoc, newComment);
    
    // Update post comment count
    const postRef = doc(db, 'posts', comment.postId);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });
    
    return newComment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (postId: string, commentId: string, updates: Partial<Comment>) => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);
    await updateDoc(commentRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);
    await deleteDoc(commentRef);
    
    // Update post comment count
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentCount: increment(-1)
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const getComments = async (postId: string, lastDoc?: DocumentSnapshot) => {
  try {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    let q = query(commentsRef, orderBy('createdAt', 'desc'), limit(20));
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Comment);
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

// Like Operations
export const togglePostLike = async (postId: string, userId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const likeRef = doc(db, `posts/${postId}/likes`, userId);
    const likeDoc = await getDoc(likeRef);
    
    if (likeDoc.exists()) {
      await deleteDoc(likeRef);
      await updateDoc(postRef, { likes: increment(-1) });
    } else {
      await setDoc(likeRef, { userId });
      await updateDoc(postRef, { likes: increment(1) });
    }
  } catch (error) {
    console.error('Error toggling post like:', error);
    throw error;
  }
};

export const toggleCommentLike = async (postId: string, commentId: string, userId: string) => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);
    const likeRef = doc(db, `posts/${postId}/comments/${commentId}/likes`, userId);
    const likeDoc = await getDoc(likeRef);
    
    if (likeDoc.exists()) {
      await deleteDoc(likeRef);
      await updateDoc(commentRef, { likes: increment(-1) });
    } else {
      await setDoc(likeRef, { userId });
      await updateDoc(commentRef, { likes: increment(1) });
    }
  } catch (error) {
    console.error('Error toggling comment like:', error);
    throw error;
  }
};

export const checkPostLike = async (postId: string, userId: string) => {
  try {
    const likeRef = doc(db, `posts/${postId}/likes`, userId);
    const likeDoc = await getDoc(likeRef);
    return likeDoc.exists();
  } catch (error) {
    console.error('Error checking post like:', error);
    throw error;
  }
};

export const checkCommentLike = async (postId: string, commentId: string, userId: string) => {
  try {
    const likeRef = doc(db, `posts/${postId}/comments/${commentId}/likes`, userId);
    const likeDoc = await getDoc(likeRef);
    return likeDoc.exists();
  } catch (error) {
    console.error('Error checking comment like:', error);
    throw error;
  }
};