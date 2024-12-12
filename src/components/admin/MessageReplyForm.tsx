import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface MessageReplyFormProps {
  messageId: string;
  onReplySuccess: () => void;
  onCancel: () => void;
}

export const MessageReplyForm: React.FC<MessageReplyFormProps> = ({
  messageId,
  onReplySuccess,
  onCancel
}) => {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !reply.trim()) return;

    setLoading(true);
    setError('');

    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      const now = new Date().toISOString();
      
      await updateDoc(messageRef, {
        replies: arrayUnion({
          content: reply.trim(),
          adminId: currentUser.uid,
          adminEmail: currentUser.email,
          createdAt: now
        }),
        status: 'in_progress',
        lastRepliedAt: now
      });

      setReply('');
      onReplySuccess();
    } catch (err) {
      console.error('Error sending reply:', err);
      setError('Failed to send reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Reply
        </label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Type your response..."
          required
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !reply.trim()}
          className={`px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 ${
            loading || !reply.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Send Reply'}
        </button>
      </div>
    </form>
  );
};