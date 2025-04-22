import React, { useEffect, useActionState } from "react";
import { LoginUser } from "../actions/actions";
import {
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Checkbox,
  Group,
  Paper,
} from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialState = { success: false, error: false, message: null };
  const { setUser } = useAuth();
  const [formState, submitAction, isPending] = useActionState(
    LoginUser,
    initialState
  );

  useEffect(() => {
    if (formState.success && formState.data) {
      setUser(formState.data);

      // checking for local user
      let localUser = localStorage.getItem("user");

      if (localUser) {
        localStorage.removeItem("user");
        console.debug("Removed temporary user from localStorage.");
      }

      notifications.show({
        title: "Success",
        message: formState.message || "User login successful!",
        position: "bottom-center",
        color: "teal",
        withCloseButton: false,
      });

      // navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 3);
    } else if (formState.error) {
      notifications.show({
        title: "Error",
        message: formState.message || "User login failed!",
        position: "bottom-center",
        color: "red",
        withCloseButton: true,
      });
    }
  }, [formState, navigate, setUser]);

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form action={submitAction}>
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          direction="column"
          wrap="wrap"
          my={".5rem"}
        >
          <TextInput
            type="email"
            name="email"
            placeholder="Enter your email address"
            rightSection={<MdAlternateEmail />}
            required
          />
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            required
          />
        </Flex>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          type="submit"
          loading={isPending ? true : false}
          variant="light"
          color="violet"
          radius="xl"
          fullWidth
          mt="xl"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
