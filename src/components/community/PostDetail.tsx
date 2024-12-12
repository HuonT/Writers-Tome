import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getComments } from '../../lib/utils/firestore';
import { Post, Comment } from '../../lib/types';
import { DocumentSnapshot } from 'firebase/firestore';
import { ArrowLeft, ThumbsUp, MessageSquare, Trash2 } from 'lucide-react';
import { CommentList } from './CommentList';
import { CreateComment } from './CreateComment';
import { useAuth } from '../../contexts/AuthContext';
import { deletePost } from '../../lib/utils/deleteUtils';
import { POST_CATEGORIES } from '../../lib/constants';
import * as Icons from 'lucide-react';

export const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<Post | null>(null);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [lastComment, setLastComment] = React.useState<DocumentSnapshot>();
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      try {
        const postData = await getPost(postId);
        setPost(postData);
        await loadComments(true);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const loadComments = async (reset: boolean = false) => {
    if (!postId || (!hasMore && !reset)) return;

    try {
      const newComments = await getComments(postId, reset ? undefined : lastComment);
      if (reset) {
        setComments(newComments);
      } else {
        setComments(prev => [...prev, ...newComments]);
      }
      setHasMore(newComments.length === 20);
      if (newComments.length > 0) {
        setLastComment(newComments[newComments.length - 1] as unknown as DocumentSnapshot);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleNewComment = (comment: Comment) => {
    setComments(prev => [comment, ...prev]);
    if (post) {
      setPost({
        ...post,
        commentCount: post.commentCount + 1
      });
    }
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    if (post) {
      setPost({
        ...post,
        commentCount: post.commentCount - 1
      });
    }
  };

  const handleDeletePost = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(post.id);
      navigate('/community');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleBack = () => {
    navigate('/community', { 
      state: { 
        from: 'postDetail',
        postId: post?.id
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Post not found</p>
        <button
          onClick={handleBack}
          className="mt-4 text-emerald-600 hover:text-emerald-700"
        >
          Return to Community
        </button>
      </div>
    );
  }

  const category = POST_CATEGORIES.find(cat => cat.id === post.category);
  const CategoryIcon = category ? (Icons as any)[category.icon] : null;

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Community
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
            {category && (
              <div className="flex items-center text-sm text-emerald-600 mt-2">
                {CategoryIcon && <CategoryIcon className="w-4 h-4 mr-1" />}
                <span>{category.label}</span>
              </div>
            )}
          </div>
          {currentUser?.uid === post.userId && (
            <button
              onClick={handleDeletePost}
              className="flex items-center text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5 mr-1" />
              Delete Post
            </button>
          )}
        </div>

        <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{post.commentCount}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500">by {post.userName}</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
        <CreateComment postId={post.id} onCommentCreated={handleNewComment} />
        <div className="mt-8">
          <CommentList
            comments={comments}
            hasMore={hasMore}
            onLoadMore={() => loadComments()}
            onCommentDeleted={handleCommentDeleted}
          />
        </div>
      </div>
    </div>
  );
};