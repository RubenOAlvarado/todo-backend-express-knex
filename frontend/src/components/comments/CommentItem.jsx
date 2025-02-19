import { BiEdit, BiTime, BiTrash, BiUserCircle } from "react-icons/bi";
import PropTypes from 'prop-types';
import { useState } from "react";

const CommentItem = ({ comment, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const setEditing = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleEdit = () => {
        onEdit({ ...comment, content: editedContent });
        setIsEditing(false);
    };

  return (
    <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <BiUserCircle className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {comment.author || 'Anonymous User'}
              </h3>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <BiTime className="w-3 h-3 mr-1" />
                <span>
                  {comment.created_at || 'Just now'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setEditing(comment)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <BiEdit className="w-4 h-4 text-gray-500 hover:text-indigo-600" />
              </button>
              <button 
                onClick={() => onDelete(comment.id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <BiTrash className="w-4 h-4 text-gray-500 hover:text-red-600" />
              </button>
            </div>
          </div>
          {isEditing ? (
            <div className="mt-2">
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    rows="3"
                />
                <div className="mt-2 flex gap-2">
                    <button 
                        onClick={handleEdit}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                    >
                        Save
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                {comment.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentItem;