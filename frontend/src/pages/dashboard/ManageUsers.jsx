import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

const ManageUsers = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // for cookies / sessions
        });

        if (!response.ok) {
          const errorData = await response.json();
          notifications.show({
            title: "Error",
            message: errorData.message || "Failed to fetch applications",
            color: "red",
          });
          return;
        }

        const result = await response.json();
        console.log(result);
        setUsers(result.data);
      } catch (error) {
        console.error("Network/server error:", error.message);
      }
    };

    fetchData();
  }, []);
  return <div>ManageUsers</div>;
};

export default ManageUsers;
