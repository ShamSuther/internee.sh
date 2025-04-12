import React, { useActionState, useEffect } from "react";
import {
  Flex,
  NumberInput,
  Button,
  FileInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import { Apply } from "../actions/actions";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

const Application = ({ job_id }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const initialState = { success: false, error: false, message: null };
  const [formState, submitAction, isPending] = useActionState(
    Apply,
    initialState
  );

  useEffect(() => {
    if (formState.success) {
      const data = { ...formState.data, hasApplied: true };
      setUser({ ...formState.data, hasApplied: true });
      const serializedObject = JSON.stringify({
        ApplicationID: data._id,
        hasApplied: true,
      });

      localStorage.setItem("user", serializedObject);
      navigate("/dashboard");
    } else if (formState.error) {
      console.error({ message: formState.message });
    }
  }, [formState, navigate, setUser]);

  return (
    <div>
      <form action={submitAction}>
        <input type="hidden" name="job_id" value={job_id} />
        <Flex
          mih={50}
          gap="sm"
          justify="flex-start"
          direction="column"
          wrap="wrap"
          my={".5rem"}
        >
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
        </Flex>
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
