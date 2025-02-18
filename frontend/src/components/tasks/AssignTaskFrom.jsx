import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTask } from "../../store/slices/tasksSlice";

const AssignTaskForm = ({ taskId, onAssign }) => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const { status, error } = useSelector((state) => state.tasks);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(onAssign(taskId, userId))
            .unwrap()
            .then(() => {
                setSuccessMessage('Task assigned successfully!');
                setUserId('');
            })
            .catch(() => {
                setSuccessMessage('');
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
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          Assign to User ID:
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {status === 'loading' ? 'Creating...' : 'Assign Task'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
      {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
    </form>
  );
};

AssignTaskForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  onAssign: PropTypes.func.isRequired,
};

export default AssignTaskForm;