import PropTypes from "prop-types";
import { BiTrash, BiUserCheck, BiUserMinus } from "react-icons/bi";
import { Link } from "react-router-dom";

const TaskItem = ({ task, onAssign, onUnassign, onDelete }) => {
    const canAssignTask = !task?.is_assigned && task?.status_id === 1;

    return (
        <li className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <Link
                        to={`/tasks/${task.id}`}
                        className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        {task.title}
                    </Link>
                </div>
                <div className="flex gap-3">
                    {canAssignTask ? (
                        <button
                            onClick={() => onAssign(task)}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm"
                        >
                            <BiUserCheck size={16} />
                            Assign
                        </button>
                    ) : (
                        <button
                            onClick={() => onUnassign(task.id)}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm"
                        >
                            <BiUserMinus size={16} />
                            Unassign
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(task.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm"
                    >
                        <BiTrash size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    onAssign: PropTypes.func.isRequired,
    onUnassign: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskItem;