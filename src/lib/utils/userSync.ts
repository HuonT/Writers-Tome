import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase';

interface EmailPreferences {
  marketing: boolean;
  communityNews: boolean;
}

export const ensureUserDocument = async (user: User, emailPreferences?: EmailPreferences) => {
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        isActive: true,
        emailVerified: user.emailVerified,
        emailPreferences: emailPreferences || {
          marketing: false,
          communityNews: false
        },
        metadata: {
          lastSignInTime: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime
        }
      });
    } else {
      // Update existing user document with latest auth data
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL,
        lastActive: serverTimestamp(),
        emailVerified: user.emailVerified,
        ...(emailPreferences && { emailPreferences }),
        metadata: {
          lastSignInTime: user.metadata.lastSignInTime
        }
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error ensuring user document:', error);
    throw error;
  }
};

export const updateUserActiveStatus = async (user: User, isActive: boolean) => {
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      isActive,
      lastActive: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user active status:', error);
    throw error;
  }
};