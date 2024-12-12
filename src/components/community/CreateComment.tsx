import React, { useState } from 'react';
import { createComment } from '../../lib/utils/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { Comment } from '../../lib/types';

interface CreateCommentProps {
  postId: string;
  onCommentCreated: (comment: Comment) => void;
}

export const CreateComment: React.FC<CreateCommentProps> = ({ postId, onCommentCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newComment = {
        postId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhotoURL: currentUser.photoURL,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0
      };

      const createdComment = await createComment(newComment);
      onCommentCreated(createdComment);
      setContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className={`px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors ${
          isSubmitting || !content.trim() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};