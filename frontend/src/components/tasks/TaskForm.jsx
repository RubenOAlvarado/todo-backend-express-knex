import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { createProjectTask } from "../../store/thunks/projectsThunks";
import { clearTask } from "../../store/slices/tasksSlice";

const TaskForm = ({ projectId, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const { status, error } = useSelector((state) => state.projects);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProjectTask({ projectId, title, description, createdBy }))
      .unwrap()
      .then(() => {
        setTitle('');
        setDescription('');
        setCreatedBy(1);
        onClose?.();
      })
      .catch(() => {
        onClose?.();
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearTask());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Task Title:</label>
        <input
          type="text"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Task Description:</label>
        <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created by:</label>
        <input
          type="text"
          placeholder="Enter User ID"
          value={createdBy}
          onChange={(e) => setCreatedBy(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      {error && <p className="mt-4 text-center text-red-500 text-sm">Error: {error}</p>}
      <div className="flex justify-end gap-3 mt-6">
        <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={status === 'loading'}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {status === 'loading' ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
    projectId: PropTypes.number.isRequired,
    onClose: PropTypes.func,
};

export default TaskForm;