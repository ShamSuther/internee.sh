import React, { useEffect, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Title, Button, List } from "@mantine/core";
import Application from "../components/Application";

function Job() {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibility, setVisibility] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async (admin_id) => {
      const adminResponse = await fetch(
        `http://localhost:3000/api/auth/user/${admin_id}`
      );
      if (!adminResponse.ok) {
        throw new Error(`HTTP error! status: ${adminResponse.status}`);
      }
      const data = await adminResponse.json();
      return data;
    };

    const fetchJob = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/jobs/${job_id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const adminData = await fetchAdmin(data.postedBy);

        setJob({ ...data, postedBy: adminData.name });
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }

  if (!job) {
    return <p>job unavailable.</p>;
  }

  return (
    <Container>
      <div className="details" style={{ textAlign: "left" }}>
        <Title order={2}>
          {job.title} ({job.type}) ({job.status})
        </Title>
        <p>{job.description}</p>
        <div>
          <p>Requirements</p>
          <List>
            {job.requirements.map((item, i) => (
              <List.Item key={i}>{item}</List.Item>
            ))}
          </List>
        </div>
        <p>{job.location}</p>
        <p>{job.category}</p>
        <p>{job.postedAt}</p>
        <p>{job.postedBy}</p>
        <Button
          variant="light"
          color="violet"
          radius="xl"
          onClick={() => setVisibility(!visibility)}
        >
          {visibility ? "Not sure" : "Apply"}
        </Button>
      </div>
      {visibility && <Application job_id={job_id} />}
    </Container>
  );
}

export default Job;
