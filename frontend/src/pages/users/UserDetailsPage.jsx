import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUser, fetchUserTasks } from "../../store/thunks/usersThunks";
import { clearUser, clearUserTasks } from "../../store/slices/usersSlice";
import { useEffect, useState } from "react";

const UserDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, status, error, tasks } = useSelector((state) => state.users);
    const [showuserTasks, setShowUserTasks] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(id));
        dispatch(fetchUserTasks(id));
        return () => {
            dispatch(clearUser());
            dispatch(clearUserTasks());
        };
    }, [dispatch, id]);

    if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{user?.email}</h1>

            <div className="mb-8">
                <button onClick={() => setShowUserTasks(!showuserTasks)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    {showuserTasks ? 'Hide Tasks' : 'Show Tasks'}
                </button>
                {showuserTasks && (
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
        </div>
    );
};

export default UserDetailsPage;