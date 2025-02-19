import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeTaskStatus, fetchTask } from "../../store/thunks/tasksThunks";
import { clearTask } from "../../store/slices/tasksSlice";
import CommentsSection from "../../components/comments/CommentsSection";
import { BiCalendar, BiLoaderCircle, BiTask, BiTime, BiUser } from "react-icons/bi";

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

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <BiLoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-gray-600 font-medium">Loading task details...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-red-500 text-center">
                        <BiTask className="w-16 h-16 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Error Loading Task</h2>
                        <p className="text-gray-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusConfig = (statusId) => {
        const configs = {
            1: {
                label: 'To Do',
                className: 'bg-blue-100 text-blue-800 border border-blue-200',
                buttonLabel: 'Start Task',
                buttonColor: 'bg-blue-500 hover:bg-blue-600'
            },
            2: {
                label: 'In Progress',
                className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
                buttonLabel: 'Mark as Done',
                buttonColor: 'bg-green-500 hover:bg-green-600'
            },
            3: {
                label: 'Done',
                className: 'bg-green-100 text-green-800 border border-green-200',
                buttonLabel: 'Reopen Task',
                buttonColor: 'bg-gray-500 hover:bg-gray-600'
            }
        };
        return configs[statusId] || configs[1];
    };

    const statusConfig = getStatusConfig(task?.status_id);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-8">
                        <div className="border-b pb-6 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {task?.title}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {task?.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
                            <div className="flex items-center space-x-4">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig.className}`}>
                                    {statusConfig.label}
                                </span>
                                <button
                                    onClick={() => handleChangeStatus(
                                        task?.status_id === 1 ? 2 : task?.status_id === 2 ? 3 : 1
                                    )}
                                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 
                                        ${statusConfig.buttonColor} transform hover:scale-105 focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-blue-500`}
                                >
                                    {statusConfig.buttonLabel}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <BiUser className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Created by</p>
                                    <p className="font-medium text-gray-900">{task?.created_by}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <BiCalendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Created at</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(task?.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            {task?.updated_at && (
                                <div className="flex items-center space-x-3 md:col-span-2">
                                    <BiTime className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Last update</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(task?.updated_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <CommentsSection taskId={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;