import React from 'react';
import { Notification } from '../../lib/types';
import { MessageSquare, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils/dateFormat';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick
}) => {
  const navigate = useNavigate();

  const handleClick = (notification: Notification) => {
    onNotificationClick(notification);
    if (notification.postId) {
      navigate(`/community/post/${notification.postId}`);
    }
  };

  // Group notifications by type
  const feedbackRequests = notifications.filter(n => n.type === 'feedback_request');
  const otherNotifications = notifications.filter(n => n.type !== 'feedback_request');

  if (notifications.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600 text-center">No notifications</p>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {feedbackRequests.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback Requests</h3>
          <div className="space-y-2">
            {feedbackRequests.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleClick(notification)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  notification.read ? 'bg-gray-50' : 'bg-emerald-50'
                } hover:bg-emerald-100`}
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-800">{notification.message}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDate(notification.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherNotifications.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Other Notifications</h3>
          <div className="space-y-2">
            {otherNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleClick(notification)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  notification.read ? 'bg-gray-50' : 'bg-emerald-50'
                } hover:bg-emerald-100`}
              >
                <p className="text-gray-800">{notification.message}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDate(notification.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};