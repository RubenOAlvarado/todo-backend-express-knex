import PropTypes from 'prop-types';
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const OrganizationList = ({ organizations, onDelete }) => {
  return (
    <ul className="space-y-2">
      {organizations.map((org) => (
        <li key={org.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/organizations/${org.id}`} className="text-lg font-semibold text-blue-500 hover:text-blue-600">
                {org.name}
              </Link>
            </div>
            <button
              onClick={() => onDelete(org.id)}
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