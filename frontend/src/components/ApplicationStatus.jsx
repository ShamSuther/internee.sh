import React from "react";
import { useAuth } from "../context/authContext";

const ApplicationStatus = () => {
  const { user } = useAuth();
  const { applicantName, createdAt, email, job_id, status } = user;
  return (
    <div>
      <div className="title">Your application is being reviewed.</div>
      <div className="details">
        Dear <b>{applicantName}</b>,
        <br />
        We have received your application submitted on <b>{createdAt}</b> for
        jobID <b>{job_id}</b>. Your current application status is:{" "}
        <b>{status}</b>. Our team is carefully reviewing all applications.
      </div>
      <div>
        We appreciate your interest and will contact you at <b>{email}</b> when
        a decision is made.
      </div>
    </div>
  );
};

export default ApplicationStatus;
