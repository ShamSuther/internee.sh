import React from "react";
import { LoginForm, Jobs } from "@/components";
import { Container, Title } from "@mantine/core";
import Temp from "@/components/Temp";

const Home = () => {
  return (
    <>
      <Container>
        <Title>Home</Title>
        <Jobs />
      </Container>
    </>
  );
};

export default Home;
