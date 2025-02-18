import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeTaskStatus, fetchTask } from "../../store/thunks/tasksThunks";
import { clearTask } from "../../store/slices/tasksSlice";

const TaskDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { task, status, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTask(id));
        return () => {
            dispatch(clearTask());
        };
    }, [dispatch, id]);

    const handleChangeStatus = async (newStatusId) => {
        dispatch(changeTaskStatus({ taskId: id, statusId: newStatusId }));
        dispatch(fetchTask(id));
    };

    if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{task?.title}</h1>
                <p className="text-gray-700 mb-6">{task?.description || 'No description provided.'}</p>
                <div className="mb-6">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <div className="mt-1 flex items-center space-x-2">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                task?.status_id === 1
                                    ? 'bg-blue-100 text-blue-800'
                                    : task?.status_id === 2
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}
                        >
                            {task?.status_id === 1
                                ? 'To Do'
                                : task?.status_id === 2
                                ? 'In Progress'
                                : 'Done'}
                        </span>
                        <button
                            onClick={() => handleChangeStatus(task?.status_id === 1 ? 2 : task?.status_id === 2 ? 3 : 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            {task?.status_id === 1
                                ? 'Start Task'
                                : task?.status_id === 2
                                ? 'Mark as Done'
                                : 'Reopen Task'}
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Created by:</span> {task?.created_by}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Created at:</span> {new Date(task?.created_at).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                                })}
                        </p>
                        {task?.updated_at && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Last update:</span> {new Date(task?.updated_at).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                    })}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;