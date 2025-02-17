import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { assignTask, changeTaskStatus, fetchTask, unassignTask } from "../../store/thunks/tasksThunks";
import { clearTask } from "../../store/slices/tasksSlice";
import AssignTaskForm from "../../components/tasks/AssignTaskFrom";
import UnassignTaskForm from "../../components/tasks/UnassignTask";

const TaskDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { task, status, error } = useSelector((state) => state.tasks);

    const [showAssignForm, setShowAssignForm] = useState(false);
    const [showUnassignForm, setShowUnassignForm] = useState(false);

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

    const handleAssignTask = async (taskId, userId) => {
        dispatch(assignTask({ taskId, userId }));
        dispatch(fetchTask(id));
        setShowAssignForm(false);
    };

    const handleUnassignTask = async (taskId, userId) => {
        dispatch(unassignTask({ taskId, userId }));
        dispatch(fetchTask(id));
        setShowUnassignForm(false);
    };

    if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const canAssignTask = !task?.assigned_to && task?.status_id === 1;
    const canUnassignTask = task?.assigned_to && task?.status_id !== 3;

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
                    {canAssignTask && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowAssignForm(!showAssignForm)}
                                className={`${
                                canAssignTask
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } text-white px-4 py-2 rounded-md transition-colors`}
                                disabled={!canAssignTask}
                            >
                                {showAssignForm ? 'Hide Assign Form' : 'Assign Task'}
                            </button>
                            {!canAssignTask && (
                                <p className="text-sm text-gray-600 mt-2">
                                {task?.status_id === 3
                                    ? 'Cannot assign a completed task.'
                                    : 'Task is already assigned.'}
                                </p>
                            )}
                            {showAssignForm && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <AssignTaskForm taskId={id} onAssign={handleAssignTask} />
                                </div>
                            )}
                        </div>
                    )}
                    {canUnassignTask && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowUnassignForm(!showUnassignForm)}
                                className={`${
                                canUnassignTask
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } text-white px-4 py-2 rounded-md transition-colors`}
                                disabled={!canUnassignTask}
                            >
                                {showUnassignForm ? 'Hide Unassign Form' : 'Unassign Task'}
                            </button>
                            {!canUnassignTask && (
                                <p className="text-sm text-gray-600 mt-2">Task is not assigned.</p>
                            )}
                            {showUnassignForm && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <UnassignTaskForm taskId={id} onUnassign={handleUnassignTask} />
                                </div>
                            )}
                        </div>
                    )}
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Created by:</span> {task?.created_by}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Created at:</span> {new Date(task?.created_at).toLocaleString()}
                        </p>
                        {task?.updated_by && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Last updated by:</span> {task?.updated_by}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;