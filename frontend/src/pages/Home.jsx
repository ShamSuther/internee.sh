import React from "react";
import { Register, Login, Jobs } from "../components";
import { Container, Title } from "@mantine/core";

const Home = () => {
  return (
    <>
      <Container>
        <Title>Home</Title>
        <Register />
        <Login />
        <Jobs />
      </Container>
    </>
  );
};

export default Home;
