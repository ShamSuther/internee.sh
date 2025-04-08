import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mantine/core";

const Jobs = () => {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading available details...</p>;
  }

  if (error) {
    return <p>Error loading jobs: {error.message}</p>;
  }

  if (!Jobs) {
    return <p>No Jobs Available.</p>;
  }

  return (
    <div>
      {Jobs.map((job, index) => (
        <div key={index}>
          <p className="category">{job.category}</p>
          <p className="title" name="title">
            {job.title} ({job.type}) ({job.location})
          </p>
          <p className="status" name="title">
            {job.status}
          </p>
          <Button
            typeof="submit"
            variant="light"
            color="violet"
            radius="xl"
            onClick={() => navigate(`/career/${job._id}`)}
          >
            Apply
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
