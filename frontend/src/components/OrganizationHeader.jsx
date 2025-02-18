import { BiPlusCircle } from "react-icons/bi";
import PropTypes from 'prop-types';

const OrganizationHeader = ({title, onAddProject, onAddUser, hideButtons }) => {
    return (
        <nav className="p-4 bg-gray-100/80 rounded-lg shadow-inner mb-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {!hideButtons && (
                    <div className="flex gap-4">
                        <button
                            onClick={onAddProject}
                            className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                        >
                            New Project
                            <BiPlusCircle size={16} />
                        </button>
                        <button
                            onClick={onAddUser}
                            className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                        >
                            New User
                            <BiPlusCircle size={16} />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

OrganizationHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onAddProject: PropTypes.func,
    onAddUser: PropTypes.func,
    hideButtons: PropTypes.bool,
};

export default OrganizationHeader;