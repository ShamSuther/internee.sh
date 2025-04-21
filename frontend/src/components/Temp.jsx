import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { LogoutUser } from "../actions/actions";
import { Button } from "@mantine/core";

const Temp = () => {
  const { user, setUser, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name} 👋</h1>
          <Button
            onClick={() => LogoutUser(setUser)}
            type="submit"
            variant="light"
            color="violet"
            radius="xl"
          >
            Logout
          </Button>
        </div>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default Temp;
