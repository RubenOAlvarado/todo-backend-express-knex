import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTask } from "../../store/slices/tasksSlice";

const AssignTaskForm = ({ task, onAssign, onCancel }) => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const { status, error } = useSelector((state) => state.tasks);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onAssign(userId);
            setSuccessMessage('Task assigned successfully!');
            setUserId('');
            onCancel?.();
        } catch (err) {
            console.error(err);
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        return () => {
          dispatch(clearTask());
        };
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                Assign task {task.title} to User ID:
            </label>
            <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {status === 'loading' ? 'Assigning...' : 'Assign Task'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
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

AssignTaskForm.propTypes = {
    task: PropTypes.object.isRequired,
    onAssign: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default AssignTaskForm;