import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { Header } from '../components/ui/Header';
import { useNavigate } from 'react-router-dom';
import { Trash2, Camera } from 'lucide-react';
import { storage, db } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { TermsModal } from '../components/auth/TermsModal';
import { deleteUserData } from '../lib/utils/deleteUtils';
import { ContactForm } from '../components/profile/ContactForm';
import { MessageHistory } from '../components/profile/MessageHistory';

interface EmailPreferences {
  marketing: boolean;
  communityNews: boolean;
}

export const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    marketing: false,
    communityNews: false
  });
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMessageHistory, setShowMessageHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadEmailPreferences = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists() && userDoc.data().emailPreferences) {
          setEmailPreferences(userDoc.data().emailPreferences);
        }
      } catch (error) {
        console.error('Error loading email preferences:', error);
      }
    };

    loadEmailPreferences();
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      if (currentUser) {
        if (name !== currentUser.displayName) {
          await updateProfile(currentUser, { displayName: name });
        }

        if (newPassword) {
          if (newPassword !== confirmPassword) {
            throw new Error('Passwords do not match');
          }
          await updatePassword(currentUser, newPassword);
        }

        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { emailPreferences });

        setMessage('Profile updated successfully');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await deleteUserData(currentUser.uid);
      await deleteUser(currentUser);
      await logout();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(currentUser, { photoURL });
      setMessage('Profile picture updated successfully');
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSuccess = () => {
    setMessage('Message sent successfully! We will respond within 30 days.');
    setShowContactForm(false);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>

          {message && (
            <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div 
                onClick={handleImageClick}
                className="w-32 h-32 rounded-full overflow-hidden cursor-pointer group relative"
              >
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-4xl text-emerald-600">
                      {currentUser?.displayName?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Email Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="communityNews"
                    checked={emailPreferences.communityNews}
                    onChange={(e) => setEmailPreferences(prev => ({
                      ...prev,
                      communityNews: e.target.checked
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="communityNews" className="ml-2 block text-sm text-gray-700">
                    Receive community news and updates
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={emailPreferences.marketing}
                    onChange={(e) => setEmailPreferences(prev => ({
                      ...prev,
                      marketing: e.target.checked
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                    Receive promotional emails and special offers
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Update Profile
            </button>
          </form>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              {showContactForm ? (
                <ContactForm onSubmitSuccess={handleContactSuccess} />
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Open Contact Form
                  </button>
                  <button
                    onClick={() => setShowMessageHistory(!showMessageHistory)}
                    className="block text-emerald-600 hover:text-emerald-700"
                  >
                    {showMessageHistory ? 'Hide Message History' : 'View Message History'}
                  </button>
                </div>
              )}
              {showMessageHistory && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Message History</h4>
                  <MessageHistory />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Legal Documents</h3>
            <div className="space-y-2">
              <button
                onClick={() => setModalType('terms')}
                className="text-emerald-600 hover:text-emerald-700"
              >
                View Terms and Conditions
              </button>
              <br />
              <button
                onClick={() => setModalType('privacy')}
                className="text-emerald-600 hover:text-emerald-700"
              >
                View Privacy Policy
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account
              </button>
            ) : (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-700 mb-4">
                  Are you sure you want to delete your account? This action cannot be undone.
                  All your data will be permanently deleted.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TermsModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'terms'}
      />
    </div>
  );
};