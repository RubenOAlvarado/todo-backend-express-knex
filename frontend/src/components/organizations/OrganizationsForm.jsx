import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrganization } from '../../store/slices/organizationsSlice';

const OrganizationForm = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { status, error } = useSelector((state) => state.organizations);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
    onClose?.();
  };

  useEffect(() => {
    return () => {
        dispatch(clearOrganization());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {status === 'loading' ? 'Creating...' : 'Create Organization'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            disabled={status === 'loading'}
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-center text-red-500">Error: {error}</p>}
    </form>
  );
};

OrganizationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrganizationForm;