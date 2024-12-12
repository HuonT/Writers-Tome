import React from 'react';
import { POST_CATEGORIES } from '../../lib/constants';
import * as Icons from 'lucide-react';
import { PostCategory } from '../../lib/types';

interface CategoryFilterProps {
  selectedCategory: PostCategory | null;
  onSelectCategory: (category: PostCategory | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            selectedCategory === null
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>All Posts</span>
        </button>
        {POST_CATEGORIES.map((category) => {
          const Icon = (Icons as any)[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title={category.description}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};