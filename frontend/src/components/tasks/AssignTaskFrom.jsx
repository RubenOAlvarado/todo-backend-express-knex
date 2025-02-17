import PropTypes from "prop-types";
import { useState } from "react";

const AssignTaskForm = ({ taskId, onAssign }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAssign(taskId, userId);
        setUserId('');
    };

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
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Assign Task
      </button>
    </form>
  );
};

AssignTaskForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  onAssign: PropTypes.func.isRequired,
};

export default AssignTaskForm;