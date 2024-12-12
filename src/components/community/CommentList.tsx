import React, { useState, useEffect } from 'react';
import { Comment } from '../../lib/types';
import { Clock, Edit2, Check, X, Trash2 } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { updateComment, deleteComment } from '../../lib/utils/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface CommentListProps {
  comments: Comment[];
  hasMore: boolean;
  onLoadMore: () => void;
  onCommentDeleted: (commentId: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  hasMore, 
  onLoadMore,
  onCommentDeleted
}) => {
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleDelete = async (comment: Comment) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await deleteComment(comment.postId, comment.id);
      onCommentDeleted(comment.id);
      setLocalComments(prev => prev.filter(c => c.id !== comment.id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const saveEdit = async (comment: Comment) => {
    try {
      await updateComment(comment.postId, comment.id, { content: editContent });
      setLocalComments(prev =>
        prev.map(c =>
          c.id === comment.id
            ? { ...c, content: editContent, updatedAt: new Date().toISOString() }
            : c
        )
      );
      setEditingCommentId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          {comment.userPhotoURL ? (
            <img 
              src={comment.userPhotoURL} 
              alt={comment.userName}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-sm text-emerald-600">
                {comment.userName[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <span className="font-medium text-gray-900">{comment.userName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(comment.createdAt)}
        </div>
      </div>
      
      {editingCommentId === comment.id ? (
        <div className="mb-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => saveEdit(comment)}
              className="flex items-center px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap mb-2">{comment.content}</p>
      )}
      
      <div className="flex items-center space-x-4 mt-2">
        <LikeButton
          postId={comment.postId}
          commentId={comment.id}
          likes={comment.likes}
          onLikeChange={(newLikes) => {
            setLocalComments(prev =>
              prev.map(c =>
                c.id === comment.id ? { ...c, likes: newLikes } : c
              )
            );
          }}
        />
        {currentUser?.uid === comment.userId && editingCommentId !== comment.id && (
          <>
            <button
              onClick={() => startEditing(comment)}
              className="flex items-center text-gray-500 hover:text-emerald-600"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => handleDelete(comment)}
              className="flex items-center text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (localComments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {localComments.map(renderComment)}

      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            className="px-4 py-2 text-emerald-600 hover:text-emerald-700"
          >
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};