import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Title,
  Group,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { fetchWithNotification } from "@/utils";
import { CirclePlus, Trash } from "lucide-react";

const ManageTasks = () => {
  const { colors } = useMantineTheme();
  const [Tasks, setTasks] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(Tasks);

  useEffect(() => {
    fetchWithNotification({
      url: "http://localhost:3000/api/tasks",
      onSuccess: (data) => setTasks(data),
    });
  }, []);

  if (Tasks.length > 0) {
    return (
      <Box>
        <Flex
          direction={"row"}
          justify={"space-between"}
          align={"center"}
          mb={".5rem"}
        >
          <Title order={3} mb=".5rem">
            Manage Tasks{" "}
            <span style={{ color: colors.gray[5], fontWeight: 500 }}>
              ({Tasks.length})
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
              <span style={{ marginRight: ".35rem" }}>Add Tasks</span>
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
                Delete {selectedRows.length > 1 ? "Tasks" : "Task"}
              </span>
              <Trash size={14} strokeWidth={3} />
            </Button>
          </Group>
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        mb={".5rem"}
      >
        <Title order={3} mb=".5rem">
          Manage Tasks: No tasks available!
        </Title>
      </Flex>
    </Box>
  );
};

export default ManageTasks;
