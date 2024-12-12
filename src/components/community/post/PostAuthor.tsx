import React from 'react';

interface PostAuthorProps {
  userName: string;
  userPhotoURL?: string | null;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ userName, userPhotoURL }) => (
  <div className="flex items-center space-x-2">
    {userPhotoURL ? (
      <img 
        src={userPhotoURL} 
        alt={userName}
        className="w-6 h-6 rounded-full object-cover"
      />
    ) : (
      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <span className="text-sm text-emerald-600">
          {userName[0]?.toUpperCase()}
        </span>
      </div>
    )}
    <span className="text-sm text-gray-500">by {userName}</span>
  </div>
);