import { BrowserRouter as Router, Routes, Route } from "react-router";
import {
  Home,
  Job,
  UserRegistration,
  Dashboard,
  Login,
  Overview,
  ManageJobs,
  ManageApps,
  ManageUsers,
  ManageTasks,
  Task,
  UserProfile,
  MemberProfile,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/career/:job_id" element={<Job />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="manage/applications" element={<ManageApps />} />
            <Route path="manage/jobs" element={<ManageJobs />} />
            <Route path="manage/interns" element={<ManageUsers />} />
            <Route path="manage/interns/:intern_id" element={<MemberProfile />} />
            <Route path="manage/tasks" element={<ManageTasks />} />
            <Route path="manage/tasks/:task_id" element={<Task />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
