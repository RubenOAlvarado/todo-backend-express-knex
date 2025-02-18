import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { createProjectTask } from "../../store/thunks/projectsThunks";
import { clearTask } from "../../store/slices/tasksSlice";

const TaskForm = ({ projectId, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState(1);
  const { status, error } = useSelector((state) => state.projects);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProjectTask({ projectId, title, description, createdBy }))
      .unwrap()
      .then(() => {
        setSuccessMessage('Task created successfully!');
        setTitle('');
        setDescription('');
        setCreatedBy(1);
        onClose?.();
      })
      .catch(() => {
        setSuccessMessage('');
        onClose?.();
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearTask());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Created by:</label>
          <input
            type="text"
            placeholder="User ID"
            value={createdBy}
            onChange={(e) => setCreatedBy(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {status === 'loading' ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            disabled={status === 'loading'}
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
    </form>
  );
};

TaskForm.propTypes = {
    projectId: PropTypes.number.isRequired,
    onClose: PropTypes.func,
};

export default TaskForm;