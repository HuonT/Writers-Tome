import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatDate } from '../../lib/utils/dateFormat';
import { MessageReplyForm } from './MessageReplyForm';

interface Reply {
  content: string;
  adminId: string;
  adminEmail: string;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  category: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'resolved';
  replies?: Reply[];
  lastRepliedAt?: string;
}

export const ContactMessageList: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'contactMessages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactMessage[];
        setMessages(newMessages);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateMessageStatus = async (messageId: string, status: 'pending' | 'in_progress' | 'resolved') => {
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await updateDoc(messageRef, { status });
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status');
    }
  };

  const handleReplySuccess = () => {
    setReplyingTo(null);
  };

  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

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

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-600 text-center">No messages found</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{message.userName}</h3>
                  <p className="text-sm text-gray-600">{message.userEmail}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                  <select
                    value={message.status}
                    onChange={(e) => updateMessageStatus(message.id, e.target.value as 'pending' | 'in_progress' | 'resolved')}
                    className="text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                  {message.category}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>

              {message.replies && message.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Replies</h4>
                  {message.replies.map((reply, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-600">{reply.adminEmail}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {replyingTo === message.id ? (
                <MessageReplyForm
                  messageId={message.id}
                  onReplySuccess={handleReplySuccess}
                  onCancel={() => setReplyingTo(null)}
                />
              ) : (
                <button
                  onClick={() => setReplyingTo(message.id)}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Reply
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};