import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Button, Grid, Card } from "@mantine/core";

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
    <Container my="md">
      <Grid>
        {Jobs.map((job, index) => (
          <Grid.Col key={index} span={{ base: 12, xs: 4 }}>
            <Card withBorder radius="lg" p={"1.5rem 1.25rem"}>
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
                radius="lg"
                onClick={() => navigate(`/career/${job._id}`)}
              >
                Apply
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Jobs;
