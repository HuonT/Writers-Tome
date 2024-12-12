import React from 'react';

interface PostTagsProps {
  tags: string[];
}

export const PostTags: React.FC<PostTagsProps> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full"
        onClick={(e) => e.stopPropagation()}
      >
        {tag}
      </span>
    ))}
  </div>
);