import React, { useState } from 'react';
import { Header } from '../components/ui/Header';
import { CreatePost } from '../components/community/CreatePost';
import { PostList } from '../components/community/PostList';
import { MemberCount } from '../components/community/MemberCount';
import { Plus } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
            <MemberCount />
          </div>
          <button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            {showCreatePost ? 'Cancel' : 'Create Post'}
          </button>
        </div>

        <div className="bg-emerald-50 rounded-lg p-6 mb-8">
          <p className="text-emerald-800 text-lg">
            Welcome to the Writer's Tome Community! Share your work for workshopping and feedback, meet fellow authors, ask your questions, offer feedback and advice, post your writing tips, share your thoughts and get inspiration...
          </p>
        </div>

        {showCreatePost && (
          <div className="mb-8">
            <CreatePost />
          </div>
        )}

        <PostList />
      </div>
    </div>
  );
};