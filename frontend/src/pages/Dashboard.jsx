import { useEffect } from "react";
import Temp from "../components/Temp";
import { Navbar, ApplicationStatus } from "../components";
import { useAuth } from "../context/authContext";
import { Flex } from "@mantine/core";

const Dashboard = () => {
  const { user, userType } = useAuth();
  useEffect(()=>{
    console.log(user,userType);
  },[user,userType])
  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="row">
      <Navbar />
      {user && userType === "applicant" && <ApplicationStatus />}
      {user && userType === "admin" && <Temp />}
      {user && userType === "intern" && <Temp />}
    </Flex>
  );
};

export default Dashboard;
