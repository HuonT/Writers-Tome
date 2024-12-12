import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TermsModal } from './TermsModal';

interface AuthFormProps {
  isLogin?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: false,
    communityNews: false
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
  const [nameError, setNameError] = useState('');
  const [isCheckingName, setIsCheckingName] = useState(false);
  
  const { signup, login, checkDisplayName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const validateName = async () => {
      if (!isLogin && name.trim()) {
        // Check for spaces in display name
        if (name.includes(' ')) {
          setNameError('Display name cannot contain spaces');
          return;
        }

        setIsCheckingName(true);
        try {
          const isTaken = await checkDisplayName(name);
          if (isTaken) {
            setNameError('This display name is already taken');
          } else {
            setNameError('');
          }
        } catch (error) {
          console.error('Error checking display name:', error);
        } finally {
          setIsCheckingName(false);
        }
      }
    };

    if (!isLogin && name.trim()) {
      timeoutId = setTimeout(validateName, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [name, isLogin, checkDisplayName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !acceptedTerms) {
      setError('You must accept the Terms and Conditions to create an account');
      return;
    }

    if (!isLogin && nameError) {
      setError('Please choose a different display name');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name, emailPreferences);
      }
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {isLogin ? 'Log In' : 'Sign Up'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                  nameError ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                required
              />
              {isCheckingName && (
                <p className="text-sm text-gray-500 mt-1">Checking availability...</p>
              )}
              {nameError && (
                <p className="text-sm text-red-600 mt-1">{nameError}</p>
              )}
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {!isLogin && (
            <>
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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I accept the{' '}
                    <button
                      type="button"
                      onClick={() => setModalType('terms')}
                      className="text-emerald-600 hover:text-emerald-500"
                    >
                      Terms and Conditions
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => setModalType('privacy')}
                      className="text-emerald-600 hover:text-emerald-500"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
              </div>
            </>
          )}
          
          <div>
            <button
              type="submit"
              disabled={loading || (!isLogin && nameError !== '')}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                loading || (!isLogin && nameError !== '') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          {isLogin ? (
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Log in
              </Link>
            </p>
          )}
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