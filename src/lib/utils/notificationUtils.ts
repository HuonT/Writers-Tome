import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Notification, FeedbackRequest } from '../types';

export const createFeedbackRequest = async (postId: string, userId: string, userName: string) => {
  try {
    const feedbackRequestRef = collection(db, 'feedbackRequests');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3); // 3 days from now

    const feedbackRequest = {
      postId,
      userId,
      userName,
      createdAt: serverTimestamp(),
      expiresAt: expiresAt.toISOString(),
      status: 'pending'
    };

    const docRef = await addDoc(feedbackRequestRef, feedbackRequest);
    
    // Create notification for all users
    const notification = {
      type: 'feedback_request',
      userId,
      postId,
      message: `${userName} is requesting feedback on their post`,
      createdAt: serverTimestamp(),
      read: false
    };

    await addDoc(collection(db, 'notifications'), notification);

    return { id: docRef.id, ...feedbackRequest };
  } catch (error) {
    console.error('Error creating feedback request:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  if (!userId) {
    console.warn('No user ID provided for getUserNotifications');
    return [];
  }

  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(50) // Limit to most recent 50 notifications
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Notification[];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  if (!notificationId) {
    console.warn('No notification ID provided for markNotificationAsRead');
    return;
  }

  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { read: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const getActiveFeedbackRequests = async (): Promise<FeedbackRequest[]> => {
  try {
    const feedbackRequestsRef = collection(db, 'feedbackRequests');
    const now = new Date().toISOString();
    
    const q = query(
      feedbackRequestsRef,
      where('status', '==', 'pending'),
      where('expiresAt', '>', now),
      limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FeedbackRequest[];
  } catch (error) {
    console.error('Error fetching feedback requests:', error);
    throw error;
  }
};