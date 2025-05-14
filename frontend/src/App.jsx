import { BrowserRouter as Router, Routes, Route } from "react-router";
import {
  Home,
  Job,
  Dashboard,
  Registration,
  Overview,
  ManageJobs,
  ManageApps,
  ManageUsers,
  ManageTasks,
  Task,
  UserProfile,
  MemberProfile,
  Error,
} from "./pages";

import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { Loader, Box } from "@mantine/core";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Box pos="relative">
        <Loader color="violet" />
      </Box>
    );

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Registration />} />
          <Route path="/register" element={<Registration login={false} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/career/:job_id"
            element={
              <ProtectedRoute>
                <Job />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="manage/applications" element={<ManageApps />} />
            <Route path="manage/jobs" element={<ManageJobs />} />
            <Route path="manage/interns" element={<ManageUsers />} />
            <Route
              path="manage/interns/:intern_id"
              element={<MemberProfile />}
            />
            <Route path="manage/tasks" element={<ManageTasks />} />
            <Route path="manage/tasks/:task_id" element={<Task />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
