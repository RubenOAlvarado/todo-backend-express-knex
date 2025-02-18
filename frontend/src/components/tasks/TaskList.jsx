import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/thunks/tasksThunks';
import { BiEdit, BiTrash } from 'react-icons/bi';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  console.log(tasks[0]);

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask(taskId));
  };
  
  return (
    <ul className="space-y-4">
      {tasks.map(({ id, title, status_id }) => (
        <li 
          key={id} 
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
        >
          <Link 
            to={`/tasks/${id}`} 
            className="text-lg font-semibold text-blue-500 hover:text-blue-600 flex-1"
          >
            {title}
          </Link>
          <div className="flex gap-3">
            {status_id === 1 ? (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
              >
                Assign
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
              >
                Unassign
              </button>
            )}
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
            >
              Edit
              <BiEdit size={16} />
            </button>
            <button 
              onClick={() => handleDeleteTask(id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
            >
              Delete
              <BiTrash size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TaskList;