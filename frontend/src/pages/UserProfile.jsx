import React from "react";
import { useAuth } from "../context/authContext";

const UserProfile = () => {
  const { user, userType } = useAuth();

  return (
    <div>
      <h1>Your Profile</h1>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};

export default UserProfile;
