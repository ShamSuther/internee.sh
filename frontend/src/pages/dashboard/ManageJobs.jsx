import React, { useEffect, useState } from "react";
import { Container, ScrollArea, Table, Title, Select } from "@mantine/core";
import classes from "@/stylesheets/TableScrollArea.module.css";
import GlobalClasses from "@/stylesheets/index.module.css";
import { notifications } from "@mantine/notifications";
import cx from "clsx";
import { Link } from "react-router-dom";

const ManageJobs = () => {
  const [results, setResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  // const rolesData = ["pending", "accepted", "rejected"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // for cookies / sessions
        });

        if (!response.ok) {
          const errorData = await response.json();
          notifications.show({
            title: "Error",
            message: errorData.message || "Failed to fetch applications",
            color: "red",
          });
          return;
        }

        const result = await response.json();
        console.log(result);
        setResults(result.data);
      } catch (error) {
        console.error("Network/server error:", error.message);
      }
    };

    fetchData();
  }, []);

  const rows = results.map((row, i) => (
    <Table.Tr key={`${row.title}-${i}`}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        <Link to={`/dashboard/manage/jobs/${row._id}`}>{row.title}</Link>
      </Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td>{row.location}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
        <Title order={3} mb=".5rem">
          Manage Jobs (Total: {results.length})
        </Title>
        <ScrollArea
          h={300}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              {/*  */}
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
    </>
  );
};

export default ManageJobs;
