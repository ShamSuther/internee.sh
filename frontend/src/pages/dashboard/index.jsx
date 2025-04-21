import { useEffect } from "react";
import Temp from "../../components/Temp";
import { Navbar, ApplicationStatus } from "../../components";
import { useAuth } from "../../context/authContext";
import { Flex } from "@mantine/core";
import { Outlet } from "react-router";

const Dashboard = () => {
  const { user, userType } = useAuth();
  useEffect(() => {
    console.log(user, userType);
  }, [user, userType]);
  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="row">
      <Navbar />
      <Outlet context={user} />
    </Flex>
  );
};

export default Dashboard;
