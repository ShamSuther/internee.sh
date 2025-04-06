import React, { useActionState, useEffect, useState } from "react";
import { RegisterUser } from "../actions/actions";
import { Input } from '@mantine/core';

const Register = () => {
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    RegisterUser,
    initialState
  );

  return (
    <div>
      <form action={submitAction}>
        <Input type="text" name="name" placeholder="enter name" required />
        <Input type="email" name="email" placeholder="enter email" required />
        <Input
          type="password"
          name="password"
          placeholder="enter password"
          required
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="confirm password"
          required
        />
        <Input
          type="text"
          name="department"
          placeholder="enter department"
          required
        />
        <button typeof="submit" disabled={isPending ? true : false}>
          {isPending ? "Registering..." : "Register"}
        </button>
        {formState.error && <p>{formState.message}</p>}
        {formState.success && <p>{formState.message}</p>}
      </form>
    </div>
  );
};

export default Register;
