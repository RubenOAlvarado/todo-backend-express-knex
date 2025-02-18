import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OrganizationsPage from "./pages/organizations/OrganizationsPage";
import OrganizationDetailPage from "./pages/organizations/OrganizationDetailPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailsPage";
import TaskDetailsPage from "./pages/tasks/TasksDetailPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationsPage />} />
        <Route path='/organizations/:id' element={<OrganizationDetailPage />} />
        <Route path='/projects/:id' element={<ProjectDetailPage />} />
        <Route path='/tasks/:id' element={<TaskDetailsPage />} />
        <Route path='/users/:id' element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;