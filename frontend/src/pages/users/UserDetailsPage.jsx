import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserTasks } from "../../store/thunks/usersThunks";
import { clearUser, clearUserTasks } from "../../store/slices/usersSlice";
import { useEffect } from "react";
import { BiBuildings, BiLoaderCircle } from "react-icons/bi";
import Header from "../../components/Header";
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

    if (status === 'loading') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
              <BiLoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-gray-600 font-medium">Loading...</p>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BiBuildings className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        );
      }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Header title={user?.email} type={'users'} />

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="px-6 py-5 border-b border-gray-200">
                        {tasks && tasks.length > 0 && (
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Assigned Tasks</h2>
                            </div>
                        )}
                        <div className="p-6">
                            <UserTasks tasks={tasks} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;