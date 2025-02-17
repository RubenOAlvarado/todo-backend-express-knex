import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserTasks = ({ tasks }) => {
    return (
        <div>
            {tasks?.length === 0 ? (
                <p className="text-center text-gray-600">User does not have tasks assigned.</p>
            ) : (
                <ul className="space-y-2 mt-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Link to={`/tasks/${task.id}`} className="text-blue-500 hover:text-blue-600">
                                        {task.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
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