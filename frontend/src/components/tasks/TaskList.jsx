import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { assignTask, deleteTask, unassignTask } from '../../store/thunks/tasksThunks';
import { useState } from 'react';
import AssignTaskForm from './AssignTaskFrom';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUnassignTask = async (taskId) => {
    dispatch(unassignTask(taskId));
  };

  const handleAssignTask = async (userId) => {
    if (selectedTask) {
      await dispatch(assignTask({ taskId: selectedTask.id, userId }));
      setSelectedTask(null);
    }
  };

  const handleAssignClick = (task) => {
    setSelectedTask(task);
  };

  if (!tasks?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks available
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onAssign={handleAssignClick}
            onUnassign={handleUnassignTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
      
      {selectedTask && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <AssignTaskForm
            task={selectedTask}
            onAssign={handleAssignTask}
            onCancel={() => setSelectedTask(null)}
          />
        </div>
      )}
    </div>
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