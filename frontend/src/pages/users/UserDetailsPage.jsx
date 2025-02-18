import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserTasks } from "../../store/thunks/usersThunks";
import { clearUser, clearUserTasks } from "../../store/slices/usersSlice";
import { useEffect } from "react";
import UserTasks from "../../components/users/UserTasks";

const UserDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, status, error, tasks } = useSelector((state) => state.users);

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
        <div className="p-6 bg-gray-100 min-h-screen text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{user?.email}</h1>

            <UserTasks tasks={tasks} />
        </div>
    );
};

export default UserDetailsPage;