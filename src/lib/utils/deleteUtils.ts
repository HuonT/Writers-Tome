import { doc, collection, getDocs, writeBatch, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const MAX_BATCH_SIZE = 500;

export const deleteUserData = async (userId: string) => {
  try {
    const batches = [];
    let currentBatch = writeBatch(db);
    let operationCount = 0;

    // Delete user's projects
    const projectsRef = collection(db, 'projects');
    const projectsQuery = query(projectsRef, where('userId', '==', userId));
    const projectsSnapshot = await getDocs(projectsQuery);

    projectsSnapshot.docs.forEach(doc => {
      currentBatch.delete(doc.ref);
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    });

    // Delete user's posts and their associated data
    const postsRef = collection(db, 'posts');
    const postsQuery = query(postsRef, where('userId', '==', userId));
    const postsSnapshot = await getDocs(postsQuery);

    for (const postDoc of postsSnapshot.docs) {
      // Delete post comments
      const commentsRef = collection(db, `posts/${postDoc.id}/comments`);
      const commentsSnapshot = await getDocs(commentsRef);

      for (const commentDoc of commentsSnapshot.docs) {
        // Delete comment likes
        const commentLikesRef = collection(db, `posts/${postDoc.id}/comments/${commentDoc.id}/likes`);
        const commentLikesSnapshot = await getDocs(commentLikesRef);

        commentLikesSnapshot.docs.forEach(likeDoc => {
          currentBatch.delete(likeDoc.ref);
          operationCount++;

          if (operationCount >= MAX_BATCH_SIZE) {
            batches.push(currentBatch.commit());
            currentBatch = writeBatch(db);
            operationCount = 0;
          }
        });

        // Delete the comment
        currentBatch.delete(commentDoc.ref);
        operationCount++;

        if (operationCount >= MAX_BATCH_SIZE) {
          batches.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      // Delete post likes
      const postLikesRef = collection(db, `posts/${postDoc.id}/likes`);
      const postLikesSnapshot = await getDocs(postLikesRef);

      postLikesSnapshot.docs.forEach(likeDoc => {
        currentBatch.delete(likeDoc.ref);
        operationCount++;

        if (operationCount >= MAX_BATCH_SIZE) {
          batches.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      });

      // Delete the post
      currentBatch.delete(postDoc.ref);
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }

    // Delete user's notifications
    const notificationsRef = collection(db, 'notifications');
    const notificationsQuery = query(notificationsRef, where('userId', '==', userId));
    const notificationsSnapshot = await getDocs(notificationsQuery);

    notificationsSnapshot.docs.forEach(doc => {
      currentBatch.delete(doc.ref);
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    });

    // Delete user's feedback requests
    const feedbackRequestsRef = collection(db, 'feedbackRequests');
    const feedbackRequestsQuery = query(feedbackRequestsRef, where('userId', '==', userId));
    const feedbackRequestsSnapshot = await getDocs(feedbackRequestsQuery);

    feedbackRequestsSnapshot.docs.forEach(doc => {
      currentBatch.delete(doc.ref);
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    });

    // Delete user document
    const userRef = doc(db, 'users', userId);
    currentBatch.delete(userRef);
    operationCount++;

    // Commit any remaining operations
    if (operationCount > 0) {
      batches.push(currentBatch.commit());
    }

    // Wait for all batches to complete
    await Promise.all(batches);
    return true;
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const batches = [];
    let currentBatch = writeBatch(db);
    let operationCount = 0;

    // Get all comments for the post
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const commentsSnapshot = await getDocs(commentsRef);

    // Process comments
    for (const commentDoc of commentsSnapshot.docs) {
      // Delete comment likes
      const likesRef = collection(db, `posts/${postId}/comments/${commentDoc.id}/likes`);
      const likesSnapshot = await getDocs(likesRef);

      likesSnapshot.docs.forEach(likeDoc => {
        currentBatch.delete(doc(db, `posts/${postId}/comments/${commentDoc.id}/likes/${likeDoc.id}`));
        operationCount++;

        if (operationCount >= MAX_BATCH_SIZE) {
          batches.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      });

      // Delete the comment
      currentBatch.delete(commentDoc.ref);
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }

    // Delete post likes
    const postLikesRef = collection(db, `posts/${postId}/likes`);
    const postLikesSnapshot = await getDocs(postLikesRef);
    
    postLikesSnapshot.docs.forEach(likeDoc => {
      currentBatch.delete(doc(db, `posts/${postId}/likes/${likeDoc.id}`));
      operationCount++;

      if (operationCount >= MAX_BATCH_SIZE) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    });

    // Delete the post document
    currentBatch.delete(doc(db, 'posts', postId));
    operationCount++;

    // Commit any remaining operations
    if (operationCount > 0) {
      batches.push(currentBatch.commit());
    }

    // Wait for all batches to complete
    await Promise.all(batches);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};