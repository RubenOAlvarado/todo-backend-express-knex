import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteComment, fetchCommentsByTaskId, updateComment } from "../../store/thunks/commentsThunks";
import { BiLoaderCircle, BiMessageRounded, BiSend } from "react-icons/bi";
import CommentItem from "./CommentItem";
import { clearComments } from "../../store/slices/commentsSlice";

const CommentsSection = ({ taskId }) => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comments);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchCommentsByTaskId(taskId));
    return () => dispatch(clearComments());
  }, [dispatch, taskId]);

  const handleAddComment = () => {
    if (content.trim()) {
      dispatch(createComment({taskId, content }));
      setContent('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleEditComment = (comment) => {
    dispatch(updateComment({ commentId: comment.id, data: { content: comment.content } }));
  }

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <BiMessageRounded className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Comments ({comments.length})
          </h2>
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex items-center justify-center py-8">
          <BiLoaderCircle className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BiMessageRounded className="w-5 h-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))
        ) : status !== 'loading' && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <BiMessageRounded className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No comments yet</h3>
            <p className="text-gray-500">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Add your comment..."
            className="w-full min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200"
          />
          <button 
            onClick={handleAddComment}
            disabled={status === 'loading'}
            className="absolute bottom-4 right-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <BiSend className="w-4 h-4 mr-2" />
            Post
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Press Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default CommentsSection;