import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ensureUserDocument, updateUserActiveStatus } from '../lib/utils/userSync';
import { isDisplayNameTaken } from '../lib/utils/userUtils';

interface EmailPreferences {
  marketing: boolean;
  communityNews: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, name: string, emailPreferences: EmailPreferences) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  loading: boolean;
  checkDisplayName: (name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await ensureUserDocument(user);
          await updateUserActiveStatus(user, true);
        }
        setCurrentUser(user);
      } catch (error) {
        console.error('Error in auth state change:', error);
      } finally {
        setLoading(false);
      }
    });

    const handleBeforeUnload = async () => {
      if (currentUser) {
        await updateUserActiveStatus(currentUser, false);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentUser]);

  const checkDisplayName = async (name: string): Promise<boolean> => {
    return isDisplayNameTaken(name);
  };

  const signup = async (email: string, password: string, name: string, emailPreferences: EmailPreferences) => {
    try {
      // Check if display name is taken
      const isTaken = await checkDisplayName(name);
      if (isTaken) {
        throw new Error('This display name is already taken. Please choose another one.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
      await ensureUserDocument(userCredential.user, emailPreferences);
      await updateUserActiveStatus(userCredential.user, true);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await ensureUserDocument(userCredential.user);
      await updateUserActiveStatus(userCredential.user, true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        await updateUserActiveStatus(currentUser, false);
      }
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (currentUser && !currentUser.emailVerified) {
      try {
        await sendEmailVerification(currentUser);
      } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    sendVerificationEmail,
    loading,
    checkDisplayName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};