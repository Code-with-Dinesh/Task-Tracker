import { Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login"
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';
import UpdateTask from './components/UpdateTask';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:projectId" element={<ProjectDetails />} />
      <Route path="/project/:projectId/updatetask" element={<UpdateTask />} />
    </Routes>
  );
}

export default App;
