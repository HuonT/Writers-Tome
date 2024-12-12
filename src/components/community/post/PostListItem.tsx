import React from 'react';
import { Post, PostCategory } from '../../../lib/types';
import { Clock, MessageSquare } from 'lucide-react';
import { PostTags } from './PostTags';
import { PostAuthor } from './PostAuthor';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';
import { formatDate } from '../../../lib/utils/dateFormat';
import { POST_CATEGORIES } from '../../../lib/constants';
import * as Icons from 'lucide-react';
import { deletePost } from '../../../lib/utils/deleteUtils';

interface PostListItemProps {
  post: Post;
  currentUserId?: string;
  editingPostId: string | null;
  editTitle: string;
  editContent: string;
  editCategory: PostCategory;
  onPostClick: (postId: string) => void;
  onEditTitleChange: (title: string) => void;
  onEditChange: (content: string) => void;
  onCategoryChange: (category: PostCategory) => void;
  onSave: (post: Post, e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onStartEditing: (post: Post) => void;
  onLikeChange: (postId: string, newLikes: number) => void;
  onFeedbackRequestChange?: (isRequesting: boolean) => void;
}

export const PostListItem: React.FC<PostListItemProps> = ({
  post,
  currentUserId,
  editingPostId,
  editTitle,
  editContent,
  editCategory,
  onPostClick,
  onEditTitleChange,
  onEditChange,
  onCategoryChange,
  onSave,
  onCancel,
  onStartEditing,
  onLikeChange,
  onFeedbackRequestChange
}) => {
  const handleClick = () => onPostClick(post.id);
  const isEditing = editingPostId === post.id;
  const category = POST_CATEGORIES.find(cat => cat.id === post.category);
  const CategoryIcon = category ? (Icons as any)[category.icon] : null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          {!isEditing && (
            <>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                {post.requestingFeedback && (
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                )}
              </div>
              {category && (
                <div className="flex items-center text-sm text-emerald-600 mt-1">
                  {CategoryIcon && <CategoryIcon className="w-4 h-4 mr-1" />}
                  <span>{category.label}</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(post.createdAt)}
        </div>
      </div>

      <PostContent
        post={post}
        isEditing={isEditing}
        editTitle={editTitle}
        editContent={editContent}
        editCategory={editCategory}
        onEditTitleChange={onEditTitleChange}
        onEditChange={onEditChange}
        onCategoryChange={onCategoryChange}
        onSave={(e) => onSave(post, e)}
        onCancel={onCancel}
        onFeedbackRequestChange={currentUserId === post.userId ? onFeedbackRequestChange : undefined}
      />

      {post.tags && post.tags.length > 0 && (
        <PostTags tags={post.tags} />
      )}

      <div className="flex items-center justify-between">
        <PostActions
          postId={post.id}
          userId={post.userId}
          currentUserId={currentUserId}
          likes={post.likes}
          commentCount={post.commentCount}
          onLikeChange={(newLikes) => onLikeChange(post.id, newLikes)}
          onEdit={(e) => {
            e.stopPropagation();
            onStartEditing(post);
          }}
          onDelete={handleDelete}
          isEditing={isEditing}
        />
        
        <PostAuthor userName={post.userName} userPhotoURL={post.userPhotoURL} />
      </div>
    </article>
  );
};