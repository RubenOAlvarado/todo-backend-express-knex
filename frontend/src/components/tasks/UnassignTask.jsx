import PropTypes from "prop-types";
import { useState } from "react";

const UnassignTaskForm = ({ taskId, onUnassign }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUnassign(taskId, userId);
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          Unassign User ID:
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
          disabled
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Unassign Task
      </button>
    </form>
  );
};

UnassignTaskForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  onUnassign: PropTypes.func.isRequired,
};

export default UnassignTaskForm;