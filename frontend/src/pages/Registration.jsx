import React from "react";
import Temp from "@/components/Temp";
import { LoginForm, RegisterForm } from "@/components";
import classes from "@/stylesheets/Auth.module.css";
import { Anchor, Container, Text, Title, Center } from "@mantine/core";
import { Link } from "react-router-dom";

const Registration = ({ login = true }) => {
  if (login) {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link to={"/register"}>Create one.</Link>
        </Text>
        <LoginForm />
      </Container>
    );
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account? <Link to={"/login"}>Use it.</Link>
      </Text>
      <RegisterForm />
    </Container>
  );
};

export default Registration;
