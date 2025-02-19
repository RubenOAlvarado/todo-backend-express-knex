import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { createOrganizationProject } from "../../store/thunks/organizationsThunks";
import { clearProject } from "../../store/slices/projectsSlice";

const ProjectForm = ({ organizationId, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const { status, error } = useSelector((state) => state.organizations);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrganizationProject({organizationId, name }));
        setName('');
        onClose?.();
    };

    useEffect(() => {
        return () => {
            dispatch(clearProject());
        };
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {status === 'loading' ? 'Creating...' : 'Create Project'}
                </button>
            </div>
        </form>
    );
};

ProjectForm.propTypes = {
    organizationId: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default ProjectForm;