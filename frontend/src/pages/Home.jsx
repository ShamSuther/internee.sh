import React from "react";
import Register from "../components/Register";
import Jobs from "../components/Jobs";
import { Container, Title } from "@mantine/core";

const Home = () => {
  return (
    <>
      <Container>
        <Title>Home</Title>
        <Register />
        <Jobs />
      </Container>
    </>
  );
};

export default Home;
