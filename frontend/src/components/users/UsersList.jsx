import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../store/thunks/usersThunks';
import { useDispatch } from 'react-redux';
import { BiTrash } from 'react-icons/bi';

const UserList = ({ users }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = async (userId) => {
    dispatch(deleteUser(userId));
  };

  if (!users?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No users available</p>
        <p className="text-sm text-gray-400">Add a new user to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <Link
                to={`/users/${user.id}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {user.email}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
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

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;