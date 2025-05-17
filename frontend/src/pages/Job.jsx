import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Title, Button, List, Modal } from "@mantine/core";
import Application from "@/components/Application";
import { useDisclosure } from "@mantine/hooks";

function Job() {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [visibility, setVisibility] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    // const fetchAdmin = async (admin_id) => {
    //   const adminResponse = await fetch(
    //     `http://localhost:3000/api/users/${admin_id}`
    //   );
    //   if (!adminResponse.ok) {
    //     throw new Error(`HTTP error! status: ${adminResponse.status}`);
    //   }
    //   const data = await adminResponse.json();
    //   return data;
    // };

    const fetchJob = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/jobs/${job_id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        // const adminData = await fetchAdmin(results.data.postedBy);
        console.log(results);

        // setJob({ ...results.data, postedBy: adminData.name });
        setJob({ ...results.data });
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
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error loading job details: {error.message}</p>;
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
        <p>{job.postedBy.email}</p>
        <Button variant="light" color="violet" radius="xl" onClick={open}>
          {opened ? "Not sure" : "Apply"}
        </Button>
      </div>
      {/* job application */}
      <Modal
        opened={opened}
        onClose={close}
        title="Application"
        radius={"lg"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Application job_id={job_id} />
      </Modal>
    </Container>
  );
}

export default Job;
