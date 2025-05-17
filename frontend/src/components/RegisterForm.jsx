import React, { useActionState, useEffect } from "react";
import { RegisterUser } from "../actions";
import { MdAlternateEmail } from "react-icons/md";
import {
  Flex,
  TextInput,
  Button,
  PasswordInput,
  Paper,
} from "@mantine/core";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

const RegisterForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    RegisterUser,
    initialState
  );

  useEffect(() => {
    if (formState.success && formState.data) {
      setUser(formState.data);

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
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
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
          <PasswordInput
            name="confirm_password"
            placeholder="Confirm your password"
            required
          />
          <TextInput
            type="text"
            name="department"
            placeholder="Enter your department"
            required
          />
        </Flex>
        <Button
          type="submit"
          loading={isPending ? true : false}
          variant="light"
          color="violet"
          radius="xl"
          fullWidth
          mt="xl"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
        {formState.error && <p>{formState.message}</p>}
        {formState.success && <p>{formState.message}</p>}
      </form>
    </Paper>
  );
};

export default RegisterForm;
