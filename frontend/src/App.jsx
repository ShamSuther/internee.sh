import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home, Job, UserRegistration, Dashboard, Login } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/career/:job_id" element={<Job />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
