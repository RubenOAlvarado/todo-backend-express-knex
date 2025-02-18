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

  if(!projects?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects available
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li key={project.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/projects/${project.id}`} className="text-lg font-semibold text-blue-500 hover:text-blue-600">
                {project.name}
              </Link>
            </div>
            <button 
              onClick={() => handleDeleteProject(project.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
            >
                Delete
                <BiTrash size={16} />
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