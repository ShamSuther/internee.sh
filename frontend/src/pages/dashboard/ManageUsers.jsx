import React, { useEffect, useState } from "react";
import {
  Checkbox,
  ScrollArea,
  Table,
  Title,
  Anchor,
  useMantineTheme,
  Flex,
  Button,
  Group,
  Box,
} from "@mantine/core";
import classes from "@/stylesheets/TableScrollArea.module.css";
import GlobalClasses from "@/stylesheets/index.module.css";
import { notifications } from "@mantine/notifications";
import { CirclePlus, Trash } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { CommonModal } from "@/components";
import { useForm } from "@mantine/form";
import { format } from "date-fns";
import cx from "clsx";

import CreateUser from "@/components/CreateUser";
import { fetchWithNotification } from "@/utils";

const ManageUsers = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, handlers] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === results.length;
  const indeterminate = selectedRows.length > 0 && !allSelected;

  const { colors } = useMantineTheme();
  const { open } = handlers;

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      department: "",
    },

    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Valid email is required",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      role: (value) => (value ? null : "Role is required"),
      department: (value) => (value.trim() ? null : "Department is required"),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result && result.success) {
        setLoading(false);
        notifications.show({
          title: "Success",
          message: result.message || "User created!",
          color: "green",
        });
        form.reset();
        handlers.close();
        window.location.reload();
      } else {
        notifications.show({
          title: "Failure",
          message: result.message || "User not created!",
          color: "red",
        });
        window.location.reload();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create user",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithNotification({
      url: "http://localhost:3000/api/users",
      onSuccess: (data) => setResults(data),
    });
  }, []);

  const rows = results.map((row, i) => {
    const formattedDate = format(new Date(row.joinDate), "PPpp");
    return (
      <Table.Tr key={`${row.applicantName}-${i}`}>
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(row._id)}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                setSelectedRows((prev) => [...prev, row._id]);
              } else {
                setSelectedRows((prev) => prev.filter((id) => id != row._id));
              }
            }}
          />
        </Table.Td>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>
          <Anchor
            size="sm"
            style={{ transition: "all 150ms ease" }}
            variant="text"
            href={`mailto:${row.email}`}
          >
            {row.email}
          </Anchor>
        </Table.Td>
        <Table.Td>{row.department}</Table.Td>
        <Table.Td>{row.role}</Table.Td>
        <Table.Td>{formattedDate}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <CommonModal title={"USER DETAILS"} handlers={handlers} opened={opened}>
        <Box>
          <CreateUser
            form={form}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Box>
      </CommonModal>
      {/* form */}
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        mb={".5rem"}
      >
        <Title order={3} mb=".5rem">
          Manage Users{" "}
          <span style={{ color: colors.gray[5], fontWeight: 500 }}>
            ({results.length})
          </span>
        </Title>

        <Group gap="md">
          <Button
            style={{ fontWeight: 500, transition: "all 150ms ease" }}
            variant="default"
            onClick={open}
            radius={"md"}
            size="sm"
          >
            <span style={{ marginRight: ".35rem" }}>Add User</span>
            <CirclePlus size={14} strokeWidth={3} />
          </Button>
          <Button
            style={{ fontWeight: 500, transition: "all 150ms ease" }}
            variant="default"
            data-disabled={true}
            radius={"md"}
            size="sm"
          >
            <span style={{ marginRight: ".35rem" }}>
              Delete {selectedRows.length > 1 ? "Users" : "User"}
            </span>
            <Trash size={14} strokeWidth={3} />
          </Button>
        </Group>
      </Flex>

      <ScrollArea
        h={"90%"}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedRows(results.map((row) => row._id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Department</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Date joined</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default ManageUsers;
