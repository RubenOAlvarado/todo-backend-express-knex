import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrganizationForm from '../../components/organizations/OrganizationsForm';
import OrganizationList from '../../components/organizations/OrganizationList';
import { createOrganization, deleteOrganization, fetchOrganizations } from '../../store/thunks/organizationsThunks';
import { resetState } from '../../store/slices/organizationsSlice';
import Header from '../../components/Header';

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

  const handleOnClose = () => {
    setShowForm(false);
  }

  if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <Header 
          title="Organizations" 
          buttonLabel="New Organization" 
          onAddFunction={() => setShowForm(true)}
          hideButton={showForm}
        />
        {showForm ? (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Organization</h2>
            <OrganizationForm onSubmit={handleCreateOrganization} onClose={handleOnClose} />
          </div>
        ) : (
          <div className="mb-8">
            {organizations.length === 0 ? (
              <p className="text-center text-gray-600">No organizations found.</p>
            ) : (
              <OrganizationList organizations={organizations} onDelete={handleDeleteOrganization} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationsPage;