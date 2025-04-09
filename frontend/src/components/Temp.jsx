import React from "react";
import { useAuth } from "../context/authContext";

const Temp = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  console.log(user);
  return (
    <div>
      {user ? <h1>Welcome, {user.name} 👋</h1> : <p>You are not logged in</p>}
    </div>
  );
};

export default Temp;
