import React, { useEffect, useState } from "react";
import {
  Box,
  ScrollArea,
  Table,
  Title,
  Flex,
  Button,
  Modal,
  useMantineTheme,
  Stack,
  TextInput,
  Textarea,
  Select,
  Group,
  CloseButton,
} from "@mantine/core";
import classes from "@/stylesheets/TableScrollArea.module.css";
// import GlobalClasses from "@/stylesheets/index.module.css";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { CirclePlus, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import cx from "clsx";

const ManageJobs = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const { colors } = useMantineTheme();

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

  const addRequirement = () => {
    form.insertListItem("requirements", "");
  };

  const removeRequirement = (index) => {
    form.removeListItem("requirements", index);
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
        console.log(result);
        setLoading(false);
        notifications.show({
          title: "Success",
          message: result.message || "Job posted successfully!",
          color: "green",
        });
      }
      setLoading(false);
      notifications.show({
        title: "Failure",
        message: result.message || "Job not posted!",
        color: "red",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to fetch applications",
        color: "red",
      });
    }
  };

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
            message: errorData.message || "Failed to fetch Jobs",
            color: "red",
          });
          return;
        }

        const result = await response.json();
        setResults(result.data);
      } catch (error) {
        notifications.show({
          title: "Error",
          message: error.message || "Failed to fetch applications",
          color: "red",
        });
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
      <Table.Td>{row.locationType}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal
        centered
        radius={"lg"}
        opened={opened}
        onClose={close}
        title="Job Details"
        overlayProps={{ backgroundOpacity: 0.55, blur: 2 }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Flex direction={"row"} gap={"1rem"}>
                <TextInput
                  label="Job title"
                  placeholder="e.g. Frontend Developer"
                  {...form.getInputProps("title")}
                />
                <Select
                  label="Job Type"
                  placeholder="Select job type"
                  data={["contract", "part-time", "full-time"]}
                  {...form.getInputProps("jobType")}
                />
              </Flex>

              <Textarea
                rows={3}
                maxRows={3}
                label="Description"
                placeholder="Job description"
                {...form.getInputProps("description")}
              />

              <TextInput
                label="Category"
                placeholder="e.g. Software Development"
                {...form.getInputProps("category")}
              />

              <Flex direction={"row"} gap={"1rem"}>
                <TextInput
                  label="Location"
                  placeholder="e.g. Karachi Pakistan"
                  {...form.getInputProps("location")}
                />
                <Select
                  label="Location type"
                  placeholder="Select location type"
                  data={["remote", "onsite", "hybrid"]}
                  {...form.getInputProps("locationType")}
                />
              </Flex>

              <Stack spacing="xs">
                <label>Requirements</label>
                {form.values.requirements.map((req, index) => (
                  <Group key={index} align="center" justify="space-between">
                    <TextInput
                      flex={1}
                      placeholder={`Requirement ${index + 1}`}
                      {...form.getInputProps(`requirements.${index}`)}
                    />
                    <CloseButton onClick={() => removeRequirement(index)} />
                  </Group>
                ))}
                <Button
                  color={"violet"}
                  variant="light"
                  radius={"md"}
                  size="sm"
                  onClick={addRequirement}
                >
                  <span style={{ marginRight: ".35rem" }}>Add requirement</span>
                  <Plus size={14} strokeWidth={3} />
                </Button>
              </Stack>

              <Button
                style={{ transition: "all 150ms ease" }}
                color={colors.violet[9]}
                type="submit"
                radius={"md"}
                data-disabled={loading ? true : false}
                loading={loading}
                size="sm"
              >
                <span style={{ marginRight: ".35rem" }}>Post a job</span>
                <ArrowRight size={14} strokeWidth={3} />
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
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

        <Button
          style={{ fontWeight: 500, transition: "all 150ms ease" }}
          variant="default"
          onClick={open}
          radius={"md"}
          size="sm"
        >
          <span style={{ marginRight: ".35rem" }}>Post a job</span>
          <CirclePlus size={14} strokeWidth={3} />
        </Button>
      </Flex>
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
