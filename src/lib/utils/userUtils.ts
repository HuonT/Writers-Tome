import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchMemberCount = async (): Promise<number> => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.size;
  } catch (error) {
    console.error('Error fetching member count:', error);
    return 0;
  }
};

export const subscribeMemberCount = (
  onUpdate: (count: number) => void,
  onError: (error: Error) => void
) => {
  const usersRef = collection(db, 'users');
  
  return onSnapshot(
    usersRef,
    (snapshot) => {
      onUpdate(snapshot.size);
    },
    (error) => {
      console.error('Error in member count subscription:', error);
      onError(error);
    }
  );
};

export const isDisplayNameTaken = async (displayName: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '==', displayName));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking display name:', error);
    throw error;
  }
};