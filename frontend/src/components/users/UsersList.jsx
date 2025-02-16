import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../store/thunks/usersThunks';
import { useDispatch } from 'react-redux';

const UserList = ({ users }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = async (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/users/${user.id}`} className="text-green-500 hover:text-green-600">
                {user.email}
              </Link>
            </div>
            <button 
              onClick={() => handleDeleteUser(user.id)}
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

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;