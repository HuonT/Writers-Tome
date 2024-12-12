import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../lib/utils/dateFormat';

interface Reply {
  content: string;
  adminEmail: string;
  createdAt: string;
}

interface Message {
  id: string;
  category: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'resolved';
  replies?: Reply[];
}

export const MessageHistory: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const messagesRef = collection(db, 'contactMessages');
        const q = query(
          messagesRef,
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];

        setMessages(newMessages);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Unable to load message history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No messages yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                {message.category}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(message.createdAt)}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
              {message.status.replace('_', ' ')}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Your Message:</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </div>

          {message.replies && message.replies.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Replies:</h4>
              {message.replies.map((reply, index) => (
                <div key={index} className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-emerald-600">From: {reply.adminEmail}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(reply.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};