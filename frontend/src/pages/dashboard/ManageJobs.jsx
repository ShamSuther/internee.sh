import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  ScrollArea,
  Table,
  Title,
  Flex,
  Button,
  Group,
  useMantineTheme,
  Checkbox,
} from "@mantine/core";
import classes from "@/stylesheets/TableScrollArea.module.css";
import { CirclePlus, Trash } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { CommonModal } from "@/components";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import cx from "clsx";

import AddJobForm from "@/components/AddJobForm";
import { fetchWithNotification } from "@/utils";

const ManageJobs = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, handlers] = useDisclosure(false);
  const [modal2opened, modal2handlers] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const { colors } = useMantineTheme();
  const { open } = handlers;
  const { open: setOpen, close: setClose } = modal2handlers;

  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === results.length;
  const indeterminate = selectedRows.length > 0 && !allSelected;

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      requirements: [""],
      category: "",
      jobType: "",
      location: "",
      locationType: "",
      status: "open",
    },

    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),

      description: (value) =>
        value.trim().length >= 30
          ? null
          : "Description must be at least 30 characters",

      requirements: (value) =>
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v.trim() !== "")
          ? null
          : "At least one valid requirement is required",

      category: (value) =>
        value.trim().length > 0 ? null : "Category is required",

      jobType: (value) =>
        ["contract", "part-time", "full-time"].includes(value)
          ? null
          : "Job type is required",

      location: (value) =>
        value.trim().length > 0 ? null : "Location is required",

      locationType: (value) =>
        ["remote", "onsite", "hybrid"].includes(value)
          ? null
          : "Location type is required",
    },
  });

  const handleConfirm = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/jobs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(selectedRows),
      });

      const result = await response.json();

      if (result && result.success) {
        notifications.show({
          title: "Success",
          message: result.message || "Jobs removed successfully!",
          color: "green",
        });
        setClose();
        window.location.reload();
      } else {
        notifications.show({
          title: "Failure",
          message: result.message || "Failed to remove jobs!",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to remove job posting",
        color: "red",
      });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/jobs", {
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
          message: result.message || "Job posted successfully!",
          color: "green",
        });
        form.reset();
        handlers.close();
      } else {
        notifications.show({
          title: "Failure",
          message: result.message || "Job not posted!",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to fetch applications",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithNotification({
      url: "http://localhost:3000/api/jobs",
      onSuccess: (data) => setResults(data),
    });
  }, []);

  const rows = results.map((row, i) => (
    <Table.Tr key={`${row.title}-${i}`}>
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
      <Table.Td>
        <Link to={`/dashboard/manage/jobs/${row._id}`}>{row.title}</Link>
      </Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td>{row.location}</Table.Td>
      <Table.Td>{row.locationType}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <CommonModal title={"JOB DETAILS"} handlers={handlers} opened={opened}>
        <Box>
          <AddJobForm
            form={form}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Box>
      </CommonModal>

      <CommonModal
        title={"Confirm or deny"}
        handlers={modal2handlers}
        opened={modal2opened}
        size={"md"}
      >
        <Box>
          <Text>
            Are you sure you want to permanently delete{" "}
            {selectedRows.length > 1
              ? `these ${selectedRows.length} job postings`
              : "this job posting"}
            ? This action cannot be undone, and all related data will be lost.
          </Text>
          <Group mt="lg" gap={"sm"} justify="flex-end">
            <Button fw={500} variant="default" radius={"md"} onClick={setClose}>
              No, I am not sure.
            </Button>
            <Button radius={"md"} onClick={() => handleConfirm()} color="red">
              Yes
            </Button>
          </Group>
        </Box>
      </CommonModal>
      {/* page data */}
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        mb={".5rem"}
      >
        <Title order={3} mb=".5rem">
          Manage Jobs{" "}
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
            <span style={{ marginRight: ".35rem" }}>Post a Job</span>
            <CirclePlus size={14} strokeWidth={3} />
          </Button>
          <Button
            color="red"
            variant="default"
            onClick={setOpen}
            radius={"md"}
            style={{ fontWeight: 500, transition: "all 150ms ease" }}
            data-disabled={selectedRows.length === 0 ? true : false}
            size="sm"
          >
            <span style={{ marginRight: ".35rem" }}>
              Remove {selectedRows.length > 1 ? "Jobs" : "Job"}
            </span>
            <Trash size={14} strokeWidth={3} />
          </Button>
        </Group>
      </Flex>
      {/* table */}
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
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Location type</Table.Th>
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
