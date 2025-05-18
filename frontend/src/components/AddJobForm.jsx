import React, { useEffect, useCallback, memo } from "react";
import {
  Text,
  Stack,
  Flex,
  TextInput,
  Textarea,
  Select,
  Group,
  CloseButton,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { ArrowRight, Plus } from "lucide-react";

// Memoized Requirement Item
const RequirementField = memo(({ index, inputProps, onRemove }) => (
  <Group key={index} align="center" justify="space-between">
    <TextInput
      flex={1}
      placeholder={`Requirement ${index + 1}`}
      {...inputProps}
    />
    <CloseButton onClick={() => onRemove(index)} />
  </Group>
));

const AddJobForm = ({ form, handleSubmit, loading }) => {
  const { colors } = useMantineTheme();
  const { errors, clearErrors, getInputProps, values } = form;

  const addRequirement = useCallback(() => {
    form.insertListItem("requirements", "");
  }, [form]);

  const removeRequirement = useCallback(
    (index) => {
      form.removeListItem("requirements", index);
    },
    [form]
  );

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = setTimeout(clearErrors, 3000);
    return () => clearTimeout(timer);
  }, [clearErrors, errors]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Flex gap="md">
          <TextInput
            label="Job title"
            placeholder="e.g. Frontend Developer"
            {...getInputProps("title")}
          />
          <Select
            label="Job Type"
            placeholder="Select job type"
            data={["contract", "part-time", "full-time"]}
            {...getInputProps("jobType")}
          />
        </Flex>

        <Textarea
          rows={3}
          maxRows={3}
          label="Description"
          placeholder="Job description"
          {...getInputProps("description")}
        />

        <TextInput
          label="Category"
          placeholder="e.g. Software Development"
          {...getInputProps("category")}
        />

        <Flex gap="md">
          <TextInput
            label="Location"
            placeholder="e.g. Karachi Pakistan"
            {...getInputProps("location")}
          />
          <Select
            label="Location type"
            placeholder="Select location type"
            data={["remote", "onsite", "hybrid"]}
            {...getInputProps("locationType")}
          />
        </Flex>

        <Stack spacing="xs">
          <label>Requirements</label>
          {values.requirements.map((_, index) => (
            <RequirementField
              key={index}
              index={index}
              inputProps={getInputProps(`requirements.${index}`)}
              onRemove={removeRequirement}
            />
          ))}
          {errors.requirements && (
            <Text size="xs" c={colors.red[8]}>
              {errors.requirements}
            </Text>
          )}
          <Button
            color="violet"
            variant="light"
            radius="md"
            size="sm"
            onClick={addRequirement}
          >
            <span style={{ marginRight: ".35rem" }}>Add requirement</span>
            <Plus size={14} strokeWidth={3} />
          </Button>
        </Stack>

        <Button
          style={{ transition: "all 150ms ease" }}
          color={colors.violet[9]}
          type="submit"
          radius="md"
          loading={loading}
          size="sm"
        >
          <span style={{ marginRight: ".35rem" }}>Post a job</span>
          <ArrowRight size={14} strokeWidth={3} />
        </Button>
      </Stack>
    </form>
  );
};

export default AddJobForm;