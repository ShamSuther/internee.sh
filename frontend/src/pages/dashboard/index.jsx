import { useEffect } from "react";
import { Navbar } from "@/components";
import { Flex, Container } from "@mantine/core";
import { Outlet } from "react-router";
import { useAuth } from "@/context/authContext";

const Dashboard = () => {
  const { user, userType } = useAuth();
  useEffect(() => {
    console.log(user, userType);
  }, [user, userType]);

  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="row">
      <Navbar />
      <Container w={"80%"} fluid py={"1rem"}>
        <Outlet context={user} />
      </Container>
    </Flex>
  );
};

export default Dashboard;
