import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from '../ui/Alert';

export const EmailVerification: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.emailVerified) {
    return null;
  }

  return (
    <Alert
      type="warning"
      title="Email Verification Required"
      message="Please verify your email address to access all features. Check your inbox for a verification link. After verifying your email, please log out and log back in to activate your account."
    />
  );
};