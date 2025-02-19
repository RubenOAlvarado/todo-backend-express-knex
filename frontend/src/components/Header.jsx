import { BiFolder, BiGroup, BiTask, BiUser } from "react-icons/bi";
import PropTypes from 'prop-types';

const Header = ({title, type }) => {

    const iconMap = {
        projects: BiFolder,
        organizations: BiGroup,
        users: BiUser,
        tasks: BiTask
    };

    const Icon = iconMap[type] || BiGroup;

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            
                            <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Header;