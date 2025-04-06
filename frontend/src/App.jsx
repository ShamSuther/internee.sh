import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home, Job } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career/:job_id" element={<Job />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;