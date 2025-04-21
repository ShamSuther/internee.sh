import React, { useEffect, useState } from "react";

const ManageApps = () => {
  useState
  useEffect(() => {
    const fetchData = async () => {
      const api_data = await fetch(
        "http://localhost:3000/api/applications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await api_data.json();
      console.log(result);
    };

    fetchData();
    return () => {};
  }, []);
  return <div>Manage Applications</div>;
};

export default ManageApps;
