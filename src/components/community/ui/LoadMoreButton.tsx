import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => (
  <div className="text-center pt-4">
    <button
      onClick={onClick}
      className="px-4 py-2 text-emerald-600 hover:text-emerald-700"
    >
      Load More
    </button>
  </div>
);