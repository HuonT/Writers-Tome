import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserNotifications, markNotificationAsRead } from '../../lib/utils/notificationUtils';
import { Notification } from '../../lib/types';
import { NotificationList } from './NotificationList';

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);
        const userNotifications = await getUserNotifications(currentUser.uid);
        setNotifications(userNotifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();

    // Set up periodic refresh
    const intervalId = setInterval(loadNotifications, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      try {
        await markNotificationAsRead(notification.id);
        setNotifications(prev =>
          prev.map(n =>
            n.id === notification.id ? { ...n, read: true } : n
          )
        );
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
    setShowDropdown(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (error) {
    return (
      <div className="text-red-600 p-2" title={error}>
        <Bell className="w-6 h-6" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-gray-400 p-2">
        <Bell className="w-6 h-6 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="fixed right-4 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden"
          style={{
            top: '4rem', // Adjust this value based on your header height
          }}
        >
          <NotificationList 
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      )}
    </div>
  );
};