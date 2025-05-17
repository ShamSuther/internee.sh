import { useEffect } from "react";
import Temp from "@/components/Temp";
import { Navbar, ApplicationStatus } from "@/components";
import { Flex } from "@mantine/core";
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
