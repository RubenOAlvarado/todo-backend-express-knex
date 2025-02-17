import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectList from '../../components/projects/ProjectsList';
import UserList from '../../components/users/UsersList';
import { fetchOrganization, getOrganizationProjects, getOrganizationUsers } from '../../store/thunks/organizationsThunks';
import { clearOrganization, clearProjects, clearUsers } from '../../store/slices/organizationsSlice';
import ProjectForm from '../../components/projects/ProjectForm';
import UserForm from '../../components/users/UserForm';

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

  if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{organization?.name}</h1>

      <div className="mb-8">
        <button
          onClick={() => setShowProjectForm(!showProjectForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showProjectForm ? 'Hide Project Form' : 'Create New Project'}
        </button>
        {showProjectForm && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create new project for {organization?.name}</h2>
            <ProjectForm organizationId={id} />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
        <ProjectList projects={projects} />
      </div>

      <div className="mb-8">
        <button
          onClick={() => setShowUserForm(!showUserForm)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          {showUserForm ? 'Hide User Form' : 'Create New User'}
        </button>
        {showUserForm && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create new user for {organization?.name}</h2>
            <UserForm organizationId={id} />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default OrganizationDetailPage;