import React, { useState, useEffect } from "react";
import {
  Flex,
  Title,
  Box,
  Avatar,
  Text,
  Paper,
  Stack,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { fetchWithNotification } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import { CommonModal } from "@/components";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [opened, handlers] = useDisclosure(false);
  const { open, close } = handlers;

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result && result.success) {
        notifications.show({
          title: "Success",
          message: result.message || "User account deleted!",
          color: "red",
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        notifications.show({
          title: "Failure",
          message: result.message || "Failed to delete user profile!",
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

  useEffect(() => {
    fetchWithNotification({
      url: "http://localhost:3000/api/users/profile",
      onSuccess: (data) => setProfile(data),
    });
  }, []);

  if (profile) {
    const { name, email, role, joinDate } = profile;
    return (
      <>
        <CommonModal
          title={"Confirm or deny"}
          handlers={handlers}
          opened={opened}
          size={"md"}
        >
          <Box>
            <Text>
              Are you sure you want to permanently delete your profile? This
              action cannot be undone, and all related data will be lost.
            </Text>
            <Group mt="lg" gap={"sm"} justify="flex-end">
              <Button fw={500} variant="default" radius={"md"} onClick={close}>
                No, I am not sure.
              </Button>
              <Button radius={"md"} onClick={() => handleConfirm()} color="red">
                Yes
              </Button>
            </Group>
          </Box>
        </CommonModal>
        <Flex
          direction={"row"}
          justify={"space-between"}
          align={"center"}
          mb={".5rem"}
        >
          <Title order={3}>Your Profile</Title>
        </Flex>
        <Stack gap={"md"}>
          {/* card */}
          <Paper
            withBorder
            radius="lg"
            w={"fit-content"}
            p={{ base: "lg", md: "xl" }}
          >
            <Avatar
              size={"xl"}
              key={name}
              name={name}
              alt={name}
              color="initials"
              mb={"md"}
            />
            <Flex gap={".25rem"} direction={"column"} fw={500} fs={"italic"}>
              <Text>
                {name} <span style={{ fontWeight: 600 }}>({role})</span>
              </Text>
              <Text>{email}</Text>
              <Text size="sm">{format(new Date(joinDate), "PPpp")}</Text>
            </Flex>
            <Button
              mt="md"
              radius={"md"}
              onClick={open}
              style={{ transition: "all 150ms ease" }}
              color="red"
            >
              Delete profile
            </Button>
          </Paper>
        </Stack>
      </>
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
          Your Profile: Not found!
        </Title>
      </Flex>
    </Box>
  );
};

export default UserProfile;
