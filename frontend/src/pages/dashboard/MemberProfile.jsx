import React from "react";
import { useParams } from "react-router";

const MemberProfile = () => {
  const { intern_id } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <div>{intern_id}</div>
    </div>
  );
};

export default MemberProfile;
