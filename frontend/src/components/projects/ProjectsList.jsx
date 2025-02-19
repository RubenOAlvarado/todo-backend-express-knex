import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../store/thunks/projectsThunks';
import { BiTrash } from 'react-icons/bi';

const ProjectList = ({ projects }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId) => {
    dispatch(deleteProject(projectId));
  };

  if (!projects?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No projects available</p>
        <p className="text-sm text-gray-400">Create a new project to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li
          key={project.id}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <Link
                to={`/projects/${project.id}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {project.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Created on: {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm"
            >
              <BiTrash size={16} />
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProjectList;