import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrganizationUser } from "../../store/thunks/organizationsThunks";
import PropTypes from "prop-types";
import { clearUser } from "../../store/slices/usersSlice";

const UserForm = ({ organizationId }) => {
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="role">Role:</label>
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                {status === 'loading' ? 'Creating...' : 'Create user'}
            </button>
            {error && <p className="text-center text-red-500">Error: {error}</p>}
        </form>
    );
};

UserForm.propTypes = {
    organizationId: PropTypes.string.isRequired,
};

export default UserForm;