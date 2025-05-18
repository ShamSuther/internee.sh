import React, { useEffect } from "react";
import {
  Text,
  Stack,
  Flex,
  TextInput,
  Select,
  Button,
  useMantineTheme,
  PasswordInput,
} from "@mantine/core";
import { ArrowRight } from "lucide-react";

const CreateUser = ({ form, handleSubmit, loading }) => {
  const { colors } = useMantineTheme();
  const { clearErrors, errors } = form;

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      const timer = setTimeout(() => clearErrors(), 3000);
      return () => clearTimeout(timer);
    }
  }, [clearErrors, errors]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Flex direction="row" gap="1rem">
          <TextInput
            label="Full Name"
            placeholder="e.g. John Doe"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="e.g. john@example.com"
            {...form.getInputProps("email")}
          />
        </Flex>

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label="Password"
          placeholder="Re-enter password"
          {...form.getInputProps("confirmPassword")}
        />

        <Select
          label="Role"
          placeholder="Select role"
          data={["admin", "intern"]}
          {...form.getInputProps("role")}
        />

        <TextInput
          label="Department"
          placeholder="e.g. Software Engineering"
          {...form.getInputProps("department")}
        />

        <Button
          style={{ transition: "all 150ms ease" }}
          color={colors.violet[9]}
          type="submit"
          radius="md"
          data-disabled={loading || undefined}
          loading={loading}
          size="sm"
        >
          <span style={{ marginRight: ".35rem" }}>Add user</span>
          <ArrowRight size={14} strokeWidth={3} />
        </Button>
      </Stack>
    </form>
  );
};

export default CreateUser;
