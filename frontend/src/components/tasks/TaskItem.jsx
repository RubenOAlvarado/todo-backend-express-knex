import PropTypes from "prop-types";
import { BiTrash, BiUserCheck, BiUserMinus } from "react-icons/bi";
import { Link } from "react-router-dom";

const TaskItem = ({ task, onAssign, onUnassign, onDelete }) => {
    const canAssignTask = !task?.is_assigned && task?.status_id === 1;
    
    return (
        <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center">
            <Link 
                to={`/tasks/${task.id}`} 
                className="text-lg font-semibold text-blue-500 hover:text-blue-600 flex-1"
            >
                {task.title}
            </Link>
            <div className="flex gap-3">
                {canAssignTask ? (
                    <button
                        onClick={() => onAssign(task)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                    >
                        Assign
                        <BiUserCheck size={16} />
                    </button>
                ) : (
                    <button
                        onClick={() => onUnassign(task.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                    >
                        Unassign
                        <BiUserMinus size={16} />
                    </button>
                )}
                <button 
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
                >
                    Delete
                    <BiTrash size={16} />
                </button>
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