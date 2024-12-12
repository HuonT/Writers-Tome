import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { checkPostLike, checkCommentLike, togglePostLike, toggleCommentLike } from '../../lib/utils/firestore';

interface LikeButtonProps {
  postId: string;
  commentId?: string;
  likes: number;
  onLikeChange?: (newLikes: number) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, commentId, likes, onLikeChange }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkLike = async () => {
      if (!currentUser) return;
      
      try {
        setError(null);
        const liked = commentId
          ? await checkCommentLike(postId, commentId, currentUser.uid)
          : await checkPostLike(postId, currentUser.uid);
        setIsLiked(liked);
      } catch (error) {
        // Don't show error to user, just log it
        console.error('Error checking like status:', error);
        // Default to not liked if we can't check the status
        setIsLiked(false);
      }
    };

    checkLike();
  }, [postId, commentId, currentUser]);

  useEffect(() => {
    setLocalLikes(likes);
  }, [likes]);

  const handleLike = async () => {
    if (!currentUser || loading) return;

    setLoading(true);
    setError(null);

    try {
      // Optimistically update UI
      const newLikes = localLikes + (isLiked ? -1 : 1);
      setLocalLikes(newLikes);
      setIsLiked(!isLiked);
      
      // Perform the actual update
      if (commentId) {
        await toggleCommentLike(postId, commentId, currentUser.uid);
      } else {
        await togglePostLike(postId, currentUser.uid);
      }
      
      // Notify parent of change
      onLikeChange?.(newLikes);
    } catch (error) {
      // Revert optimistic update on error
      setLocalLikes(likes);
      setIsLiked(!isLiked);
      setError('Unable to update like status. Please try again.');
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLike}
        disabled={loading || !currentUser}
        className={`flex items-center space-x-1 ${
          isLiked ? 'text-emerald-600' : 'text-gray-500'
        } hover:text-emerald-700 transition-colors disabled:opacity-50`}
        title={!currentUser ? 'Please log in to like' : undefined}
      >
        <ThumbsUp className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
        <span>{localLikes}</span>
      </button>
      {error && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};