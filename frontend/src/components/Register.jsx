import React, { useActionState } from "react";
import { RegisterUser } from "../actions/actions";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";

const Register = () => {
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    RegisterUser,
    initialState
  );

  return (
    <div>
      <form action={submitAction}>
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
        <Button
          type="submit"
          loading={isPending ? true : false}
          variant="light"
          color="violet"
          radius="xl"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
        {formState.error && <p>{formState.message}</p>}
        {formState.success && <p>{formState.message}</p>}
      </form>
    </div>
  );
};

export default Register;
