import PropTypes from "prop-types";
import { BiPlusCircle } from "react-icons/bi";

const Header = ({ title, buttonLabel, onAddFunction, hideButton }) => {

    return (
        <nav className="p-4 bg-gray-100/80 rounded-lg shadow-inner mb-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {!hideButton && (
                    <button
                        onClick={onAddFunction}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        {buttonLabel}
                        <BiPlusCircle size={18} />
                    </button>
                )}
            </div>
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    onAddFunction: PropTypes.func.isRequired,
    hideButton: PropTypes.bool,
};

export default Header;