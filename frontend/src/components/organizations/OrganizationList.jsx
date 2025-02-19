import PropTypes from 'prop-types';
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const OrganizationList = ({ organizations, onDelete }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <div 
          key={org.id} 
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link 
                to={`/organizations/${org.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {org.name}
              </Link>
              <button
                onClick={() => onDelete(org.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Delete organization"
              >
                <BiTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

OrganizationList.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrganizationList;