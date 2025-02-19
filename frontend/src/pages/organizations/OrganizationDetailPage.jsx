import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectList from '../../components/projects/ProjectsList';
import UserList from '../../components/users/UsersList';
import { fetchOrganization, getOrganizationProjects, getOrganizationUsers } from '../../store/thunks/organizationsThunks';
import { clearOrganization, clearProjects, clearUsers } from '../../store/slices/organizationsSlice';
import ProjectForm from '../../components/projects/ProjectForm';
import UserForm from '../../components/users/UserForm';
import { BiBuildings, BiLoaderCircle, BiPlusCircle } from 'react-icons/bi';
import Header from '../../components/Header';

const OrganizationDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { organization, projects, users, status, error } = useSelector((state) => state.organizations);


  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganization(id));
    dispatch(getOrganizationProjects(id));
    dispatch(getOrganizationUsers(id));
    return () => {
      dispatch(clearOrganization());
      dispatch(clearProjects());
      dispatch(clearUsers());
    };
  }, [dispatch, id]);

  const handleAddProject = () => {
    setShowProjectForm(true);
    setShowUserForm(false);
  };

  const handleAddUser = () => {
    setShowUserForm(true);
    setShowProjectForm(false);
  };

  const handleOnClose = () => {
    setShowProjectForm(false);
    setShowUserForm(false);
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
      <div className="max-w-7xl mx-auto">
        <Header 
          title={organization?.name}
          type={'organizations'}
        />

        <div className="mt-8">
          {showProjectForm ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create new project for {organization?.name}
                </h2>
              </div>
              <div className="p-6">
                <ProjectForm organizationId={id} onClose={handleOnClose} />
              </div>
            </div>
          ) : showUserForm ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create new user for {organization?.name}
                </h2>
              </div>
              <div className="p-6">
                <UserForm organizationId={id} onClose={handleOnClose} />
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                    <button
                      onClick={handleAddProject}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <BiPlusCircle className="w-4 h-4 mr-1.5" />
                      Add Project
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ProjectList projects={projects} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                    <button
                      onClick={handleAddUser}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <BiPlusCircle className="w-4 h-4 mr-1.5" />
                      Add User
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <UserList users={users} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;