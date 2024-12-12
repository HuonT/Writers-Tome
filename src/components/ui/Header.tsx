import React from 'react';
import { LogOut, User, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { NotificationBell } from '../notifications/NotificationBell';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
          Writer's Tome
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/community" 
            className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5 mr-2" />
            <span>Community</span>
          </Link>
          
          <NotificationBell />
          
          <Link 
            to="/profile" 
            className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
          >
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
            ) : (
              <User className="w-5 h-5 mr-2" />
            )}
            <span>{currentUser?.displayName}</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};