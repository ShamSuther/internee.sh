import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Table,
  Title,
  Select,
  useMantineTheme,
} from "@mantine/core";
import classes from "@/stylesheets/TableScrollArea.module.css";
import GlobalClasses from "@/stylesheets/index.module.css";
import { notifications } from "@mantine/notifications";
import { fetchWithNotification } from "@/utils";
import cx from "clsx";

const ManageApps = () => {
  const [results, setResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const rolesData = ["pending", "accepted", "rejected"];
  const { colors } = useMantineTheme();

  useEffect(() => {
    fetchWithNotification({
      url: "http://localhost:3000/api/applications",
      onSuccess: (data) => setResults(data),
    });
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/applications/${appId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        }
      );

      const results = await response.json();

      if (!response.ok) {
        notifications.show({
          title: `${response.text}`,
          message: results.message || "Status update failed",
          position: "bottom-right",
          color: "red",
          withCloseButton: false,
        });
      }
      // Update local state instantly (optional, improves UX)
      setResults((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );

      notifications.show({
        title: "Success",
        message: results.message || "Status update failed",
        position: "bottom-right",
        color: "teal",
        withCloseButton: true,
      });
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: error.message || "Status update failed",
        position: "bottom-right",
        color: "red",
        withCloseButton: true,
      });
    }
  };

  const rows = results.map((row, i) => (
    <Table.Tr key={`${row.applicantName}-${i}`}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{row.applicantName}</Table.Td>
      <Table.Td>{row.jobTitle}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.mobileNumber}</Table.Td>
      <Table.Td>{row.experienceYears}</Table.Td>
      <Table.Td maw={150}>
        <Select
          data={rolesData}
          defaultValue={row.status}
          variant="unstyled"
          allowDeselect={false}
          onChange={(e) => handleStatusChange(row._id, e)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={3} mb=".5rem">
        Manage Applications{" "}
        <span style={{ color: colors.gray[5], fontWeight: 500 }}>
          ({results.length})
        </span>
      </Title>
      <ScrollArea
        h={"90%"}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Mobile Number</Table.Th>
              <Table.Th>Experience</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default ManageApps;
