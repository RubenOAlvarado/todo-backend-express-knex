import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrganizationUser } from "../../store/thunks/organizationsThunks";
import PropTypes from "prop-types";
import { clearUser } from "../../store/slices/usersSlice";

const UserForm = ({ organizationId, onClose }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const { status, error } = useSelector((state) => state.organizations);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrganizationUser({ organizationId, email, password, role }));
        setEmail("");
        setPassword("");
        setRole("user");
    }
    
    useEffect(() => {
        return () => {
        dispatch(clearUser());
        };
    }, [dispatch]);
    
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter user password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {error && <p className="mt-4 text-center text-red-500 text-sm">Error: {error}</p>}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={status === 'loading'}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    {status === 'loading' ? 'Creating...' : 'Create User'}
                </button>
            </div>
        </form>
    );
};

UserForm.propTypes = {
    organizationId: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default UserForm;