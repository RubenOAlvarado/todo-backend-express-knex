import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserTasks = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return <p className="text-center text-gray-600">User does not have tasks assigned.</p>;
    }
    return (
        <ul className="space-y-4">
            {tasks.map((task) => (
                <li key={task.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div className="flex-1"> 
                            <Link 
                                to={`/tasks/${task.id}`} 
                                className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {task.title}
                            </Link>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

UserTasks.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default UserTasks;