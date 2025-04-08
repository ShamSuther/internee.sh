import React, { useActionState } from "react";
import {
  Input,
  NumberInput,
  Button,
  FileInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import { Apply } from "../actions/actions";

const Application = () => {
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    Apply,
    initialState
  );

  return (
    <div>
      <form action={submitAction}>
        <TextInput name="name" placeholder="Full name" required />
        <TextInput
          name="email"
          placeholder="Email address"
          rightSection={<MdAlternateEmail />}
          required
        />
        <NumberInput
          name="mobile_number"
          allowNegative={false}
          placeholder="Mobile number"
          required
        />
        <NumberInput
          name="experience"
          allowNegative={false}
          placeholder="Years of experience"
          required
        />
        <FileInput
          name="file"
          rightSection={<TbFileCv />}
          placeholder="Your CV"
          accept="pdf"
        />
        <Textarea
          name="expectations"
          placeholder="What do you expect from us?"
          autosize
          minRows={2}
        />
        <Button variant="light" color="violet" radius="xl">
          {isPending ? "Applying" : "Apply"}
        </Button>
        {formState.error && <p>{formState.message}</p>}
        {formState.success && <p>{formState.message}</p>}
      </form>
    </div>
  );
};

export default Application;
