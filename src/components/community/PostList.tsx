import React, { useState, useEffect, useCallback } from 'react';
import { Post, PostCategory } from '../../lib/types';
import { DocumentSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PostListItem } from './post/PostListItem';
import { CategoryFilter } from './CategoryFilter';
import { loadPostsData, updatePostContent } from '../../lib/utils/postUtils';
import { LoadingState } from './states/LoadingState';
import { EmptyState } from './states/EmptyState';
import { LoadMoreButton } from './ui/LoadMoreButton';
import { createFeedbackRequest } from '../../lib/utils/notificationUtils';

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot>();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<PostCategory>('plot');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const loadPosts = useCallback(async (reset: boolean = false) => {
    if (!hasMore && !reset) return;
    
    try {
      const { newPosts, hasMore: moreAvailable, newLastDoc } = 
        await loadPostsData(selectedCategory, reset ? undefined : lastDoc, reset);
      
      setPosts(prev => reset ? newPosts : [...prev, ...newPosts]);
      setHasMore(moreAvailable);
      setLastDoc(newLastDoc);
      setError(null);
    } catch (error) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, lastDoc, hasMore]);

  useEffect(() => {
    setLoading(true);
    setLastDoc(undefined);
    loadPosts(true);
  }, [selectedCategory, loadPosts]);

  const handlePostClick = (postId: string) => {
    if (editingPostId !== postId) {
      navigate(`/community/post/${postId}`);
    }
  };

  const handleStartEditing = (post: Post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditCategory(post.category);
  };

  const handleCancelEditing = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
    setEditCategory('plot');
  };

  const handleSaveEdit = async (post: Post) => {
    try {
      const updatedPosts = await updatePostContent(
        post.id,
        editTitle,
        editContent,
        editCategory,
        post.requestingFeedback || false,
        posts
      );
      setPosts(updatedPosts);
      setEditingPostId(null);
      setEditTitle('');
      setEditContent('');
      setEditCategory('plot');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  const handleFeedbackRequestChange = async (postId: string, isRequesting: boolean) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post || !currentUser) return;

      const updatedPosts = await updatePostContent(
        postId,
        post.title,
        post.content,
        post.category,
        isRequesting,
        posts
      );

      if (isRequesting) {
        await createFeedbackRequest(postId, currentUser.uid, currentUser.displayName || 'Anonymous');
      }

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating feedback request:', error);
      setError('Failed to update feedback request. Please try again.');
    }
  };

  const handleLikeChange = (postId: string, newLikes: number) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, likes: newLikes } : p
    ));
  };

  return (
    <div className="space-y-4">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && posts.length === 0 ? (
        <LoadingState />
      ) : posts.length === 0 ? (
        <div>
          {selectedCategory ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No posts yet in the {selectedCategory} category.</p>
              <p className="text-gray-500">Select another category above or be the first to create a post in this category!</p>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      ) : (
        <>
          {posts.map(post => (
            <PostListItem
              key={post.id}
              post={post}
              currentUserId={currentUser?.uid}
              editingPostId={editingPostId}
              editTitle={editTitle}
              editContent={editContent}
              editCategory={editCategory}
              onPostClick={handlePostClick}
              onEditTitleChange={setEditTitle}
              onEditChange={setEditContent}
              onCategoryChange={setEditCategory}
              onSave={handleSaveEdit}
              onCancel={handleCancelEditing}
              onStartEditing={handleStartEditing}
              onLikeChange={handleLikeChange}
              onFeedbackRequestChange={
                (isRequesting) => handleFeedbackRequestChange(post.id, isRequesting)
              }
            />
          ))}

          {hasMore && (
            <LoadMoreButton onClick={() => loadPosts()} />
          )}
        </>
      )}
    </div>
  );
};