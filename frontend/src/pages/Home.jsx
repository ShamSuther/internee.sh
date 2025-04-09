import React from "react";
import { Register, Login, Jobs } from "../components";
import { Container, Title } from "@mantine/core";
import Temp from "../components/Temp";

const Home = () => {
  return (
    <>
      <Container>
        <Title>Home</Title>
        <Temp />
        <Register />
        <Login />
        <Jobs />
      </Container>
    </>
  );
};

export default Home;
