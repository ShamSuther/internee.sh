import React from "react";
import { Card, Title, Text, Divider, Stack } from "@mantine/core";
import { useAuth } from "../context/authContext";

const ApplicationStatus = () => {
  const { user } = useAuth();
  const { applicantName, createdAt, email, job_id, status } = user;

  return (
    <Card shadow="md" radius="md" padding="lg" withBorder>
      <Stack spacing="sm">
        <Title order={3} color="blue">
          Application Under Review
        </Title>

        <Divider />

        <Text>
          Dear <Text component="span" fw={600}>{applicantName}</Text>,
        </Text>

        <Text>
          We have received your application submitted on{" "}
          <Text component="span" fw={600}>{new Date(createdAt).toLocaleDateString()}</Text> 
          {" "}for job ID <Text component="span" fw={600}>{job_id}</Text>.
        </Text>

        <Text>
          Your current application status is:{" "}
          <Text component="span" fw={600} c="blue">
            {status}
          </Text>.
        </Text>

        <Text>
          Our team is carefully reviewing all applications. We appreciate your
          interest and will contact you at{" "}
          <Text component="span" fw={600}>{email}</Text> when a decision is made.
        </Text>
      </Stack>
    </Card>
  );
};

export default ApplicationStatus;
