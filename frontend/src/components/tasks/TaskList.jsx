import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/thunks/tasksThunks';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask(taskId));
  };
  
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/tasks/${task.id}`} className="text-lg font-semibold text-blue-500 hover:text-blue-600">
                {task.title}
              </Link>
            </div>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
            >
                Delete
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