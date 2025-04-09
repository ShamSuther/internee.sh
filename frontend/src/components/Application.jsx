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

const Application = ({ job_id }) => {
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    Apply,
    initialState
  );

  console.log(job_id);

  return (
    <div>
      <form action={submitAction}>
        <input type="hidden" name="job_id" value={job_id} />
        <TextInput name="applicant_name" placeholder="Full name" required />
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
          accept=".pdf,.docx"
          required
        />
        <Textarea
          name="expectations"
          placeholder="What do you expect from us?"
          autosize
          minRows={2}
        />
        <Button type="submit" variant="light" color="violet" radius="xl">
          {isPending ? "Applying" : "Apply"}
        </Button>
      </form>
      {formState.error && <p>{formState.message}</p>}
      {formState.success && <p>{formState.message}</p>}
    </div>
  );
};

export default Application;
