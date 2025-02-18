import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectList from '../../components/projects/ProjectsList';
import UserList from '../../components/users/UsersList';
import { fetchOrganization, getOrganizationProjects, getOrganizationUsers } from '../../store/thunks/organizationsThunks';
import { clearOrganization, clearProjects, clearUsers } from '../../store/slices/organizationsSlice';
import ProjectForm from '../../components/projects/ProjectForm';
import UserForm from '../../components/users/UserForm';
import OrganizationHeader from '../../components/OrganizationHeader';

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


  if (status === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <OrganizationHeader 
          title={organization?.name}
          onAddProject={handleAddProject}
          onAddUser={handleAddUser}
          hideButtons={showProjectForm || showUserForm}
        />
      </div>
      {showProjectForm ? (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create new project for {organization?.name}</h2>
            <ProjectForm organizationId={id} onClose={handleOnClose} />
          </div>
        ) : showUserForm ? (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create new user for {organization?.name}</h2>
            <UserForm organizationId={id} onClose={handleOnClose} />
          </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
            <ProjectList projects={projects} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
            <UserList users={users} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationDetailPage;