import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Badge } from '../types';

export const saveUserBadge = async (userId: string, badge: Badge) => {
  if (!badge.earned) return;

  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const existingBadges = userDoc.data()?.earnedBadges || [];
    
    // Check if badge is already earned
    if (!existingBadges.some((b: Badge) => b.id === badge.id)) {
      await updateDoc(userRef, {
        earnedBadges: arrayUnion({
          ...badge,
          earnedAt: new Date().toISOString()
        })
      });
    }
  } catch (error) {
    console.error('Error saving user badge:', error);
    throw error;
  }
};

export const getUserBadges = async (userId: string): Promise<Badge[]> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().earnedBadges) {
      return userDoc.data().earnedBadges as Badge[];
    }
    return [];
  } catch (error) {
    console.error('Error getting user badges:', error);
    return [];
  }
};