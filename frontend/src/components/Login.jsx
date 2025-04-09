import React, { useActionState } from "react";
import { LoginUser } from "../actions/actions";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";

const Login = () => {
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    LoginUser,
    initialState
  );

  return (
    <div>
      <h2>Login.</h2>
      <form action={submitAction}>
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
        <Button
          type="submit"
          loading={isPending ? true : false}
          variant="light"
          color="violet"
          radius="xl"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {formState.error && <p>{formState.message}</p>}
        {formState.success && <p>{formState.message}</p>}
      </form>
    </div>
  );
};

export default Login;
