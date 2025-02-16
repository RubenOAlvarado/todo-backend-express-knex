import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../store/thunks/projectsThunks';

const ProjectList = ({ projects }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li key={project.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/projects/${project.id}`} className="text-blue-500 hover:text-blue-600">{project.name}</Link>
            </div>
            <button 
              onClick={() => handleDeleteProject(project.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
            >
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