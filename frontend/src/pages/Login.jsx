import React from "react";
import Temp from "../components/Temp";
import { LoginForm } from "../components";
import classes from "../stylesheets/Auth.module.css";
import { Anchor, Container, Text, Title, Center } from "@mantine/core";

const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>
      <LoginForm />
    </Container>
  );
};

export default Login;
