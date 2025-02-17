import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrganizationForm from '../../components/organizations/OrganizationsForm';
import OrganizationList from '../../components/organizations/OrganizationList';
import { createOrganization, deleteOrganization, fetchOrganizations } from '../../store/thunks/organizationsThunks';
import { resetState } from '../../store/slices/organizationsSlice';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { organizations, status, error } = useSelector((state) => state.organizations);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganizations());
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const handleCreateOrganization = async (data) => {
    dispatch(createOrganization(data));
  };

  const handleDeleteOrganization = async (id) => {
    dispatch(deleteOrganization(id));
  };

  if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Organizations</h1>
      <div className="mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Hide Form' : 'Create New Organization'}
        </button>
        {showForm && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Organization</h2>
            <OrganizationForm onSubmit={handleCreateOrganization} />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Organization List</h2>
        <OrganizationList organizations={organizations} onDelete={handleDeleteOrganization} />
      </div>
    </div>
  );
};

export default OrganizationsPage;