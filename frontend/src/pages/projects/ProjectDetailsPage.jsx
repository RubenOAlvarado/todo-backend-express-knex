import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskList from '../../components/tasks/TaskList';
import { fetchProject, fetchProjectTasks } from '../../store/thunks/projectsThunks';
import { clearProject, clearTasks } from '../../store/slices/projectsSlice';
import TaskForm from '../../components/tasks/TaskForm';

const ProjectDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { project, tasks, status, error } = useSelector((state) => state.projects);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProject(id));
    dispatch(fetchProjectTasks(id));
    return () => {
      dispatch(clearProject());
      dispatch(clearTasks());
    };
  }, [dispatch, id]);

  if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{project?.name}</h1>

      <div className="mb-8">
        <button
          onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showNewTaskForm ? 'Hide Task Form' : 'Create New Task'}
        </button>
          {showNewTaskForm && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Create new task</h2>
              <TaskForm projectId={id} />
            </div>
          )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks found.</p>
        ): (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;