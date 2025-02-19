import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrganizationForm from '../../components/organizations/OrganizationsForm';
import OrganizationList from '../../components/organizations/OrganizationList';
import { createOrganization, deleteOrganization, fetchOrganizations } from '../../store/thunks/organizationsThunks';
import { resetState } from '../../store/slices/organizationsSlice';
import Header from '../../components/Header';
import { BiLoaderCircle, BiBuildings, BiPlusCircle } from 'react-icons/bi';

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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <BiLoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-600 font-medium">Loading organizations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <BiBuildings className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header title="Organizations" />

        <div className="mt-8">
          {showForm ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New Organization
                </h2>
                <div className="p-6">
                  <OrganizationForm
                    onSubmit={handleCreateOrganization}
                    onClose={() => setShowForm(false)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {organizations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BiBuildings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No organizations yet</h3>
                  <p className="text-gray-500 mb-4">Create your first organization to get started</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Organization
                  </button>
                </div>
              ) : (
                <div className="grid gap-8">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          <BiPlusCircle className="w-4 h-4 mr-1.5" />
                          Add Organization
                        </button>
                      </div>
                    </div>
                    <div className="p-12">
                      <OrganizationList
                        organizations={organizations}
                        onDelete={handleDeleteOrganization}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;