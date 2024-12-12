import React from 'react';
import { Check, X } from 'lucide-react';
import { Post, PostCategory } from '../../../lib/types';
import { POST_CATEGORIES } from '../../../lib/constants';
import { FeedbackRequestToggle } from '../FeedbackRequestToggle';

interface PostContentProps {
  post: Post;
  isEditing: boolean;
  editTitle: string;
  editContent: string;
  editCategory: PostCategory;
  onEditTitleChange: (title: string) => void;
  onEditChange: (content: string) => void;
  onCategoryChange: (category: PostCategory) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onFeedbackRequestChange?: (isRequesting: boolean) => void;
}

export const PostContent: React.FC<PostContentProps> = ({
  post,
  isEditing,
  editTitle,
  editContent,
  editCategory,
  onEditTitleChange,
  onEditChange,
  onCategoryChange,
  onSave,
  onCancel,
  onFeedbackRequestChange
}) => {
  if (isEditing) {
    return (
      <div onClick={e => e.stopPropagation()} className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={editCategory}
            onChange={(e) => onCategoryChange(e.target.value as PostCategory)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {onFeedbackRequestChange && (
          <div className="mt-4">
            <FeedbackRequestToggle
              isRequesting={post.requestingFeedback || false}
              onToggle={onFeedbackRequestChange}
            />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onSave}
            className="flex items-center px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            <Check className="w-4 h-4 mr-1" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>;
};