import React from 'react';
import { Edit2, MessageSquare, Trash2 } from 'lucide-react';
import { LikeButton } from '../LikeButton';

interface PostActionsProps {
  postId: string;
  userId: string;
  currentUserId: string | undefined;
  likes: number;
  commentCount: number;
  onLikeChange: (newLikes: number) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  isEditing: boolean;
}

export const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userId,
  currentUserId,
  likes,
  commentCount,
  onLikeChange,
  onEdit,
  onDelete,
  isEditing
}) => (
  <div className="flex items-center space-x-4">
    <div onClick={(e) => e.stopPropagation()}>
      <LikeButton
        postId={postId}
        likes={likes}
        onLikeChange={onLikeChange}
      />
    </div>
    <div className="flex items-center text-gray-500">
      <MessageSquare className="w-4 h-4 mr-1" />
      <span>{commentCount}</span>
    </div>
    {currentUserId === userId && !isEditing && (
      <>
        <button
          onClick={onEdit}
          className="flex items-center text-gray-500 hover:text-emerald-600"
        >
          <Edit2 className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center text-gray-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
      </>
    )}
  </div>
);