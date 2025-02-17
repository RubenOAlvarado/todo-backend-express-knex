import { useEffect, useState } from "react";
import { clearUsers } from "../../store/slices/organizationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { createOrganizationUser } from "../../store/thunks/organizationsThunks";
import PropTypes from "prop-types";

const UserForm = ({ organizationId }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { status, error } = useSelector((state) => state.organizations);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrganizationUser({ email, password, organizationId }));
        setEmail("");
        setPassword("");
    }
    
    useEffect(() => {
        return () => {
        dispatch(clearUsers());
        };
    }, [dispatch]);
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Create new user</h3>
            <div>
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
            </div>
            <div>
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
            </div>
            <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
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