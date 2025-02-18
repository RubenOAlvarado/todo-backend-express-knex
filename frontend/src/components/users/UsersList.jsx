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

  if(!users?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No users available
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/users/${user.id}`} className="text-lg font-semibold text-blue-500 hover:text-blue-600">
                {user.email}
              </Link>
            </div>
            <button 
              onClick={() => handleDeleteUser(user.id)}
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

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;