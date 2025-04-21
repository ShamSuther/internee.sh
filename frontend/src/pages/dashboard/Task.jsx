import React from "react";
import { useParams } from "react-router";

const Task = () => {
  const { task_id } = useParams();
  return (
    <div>
      <h1>Task</h1>
      <p>{task_id}</p>
    </div>
  );
};

export default Task;
