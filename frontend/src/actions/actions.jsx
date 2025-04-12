"use server";

import { redirect } from "react-router";

// Register user
export async function RegisterUser(prevState, formdata) {
  const data = Object.fromEntries(formdata.entries());
  if (data.password != data.confirm_password) {
    return {
      ...prevState,
      success: false,
      error: true,
      message: "passwords don't match!",
    };
  }
  delete data.confirm_password;

  const api_data = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const response_data = await api_data.json();

  if (api_data.ok && response_data.success) {
    return {
      ...prevState,
      success: true,
      error: false,
      message: api_data.message || "User Registered successfully!",
      data: response_data.result || null,
    };
  } else {
    return {
      ...prevState,
      success: false,
      error: true,
      message: response_data.message || "Registration failed!",
    };
  }
}

// Login
export async function LoginUser(prevState, formdata) {
  const data = Object.fromEntries(formdata.entries());

  const api_data = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const response = await api_data.json();

  if (api_data.ok && response.success) {
    return {
      ...prevState,
      success: true,
      error: false,
      message: response.message || "User login successful!",
      data: response.data || null,
    };
  } else {
    return {
      ...prevState,
      success: false,
      error: true,
      message: response.message || "Login failed!",
    };
  }
}
// Logout user
export async function LogoutUser(setUser) {
  try {
    const api_data = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const response_data = await api_data.json();
    if (api_data.ok && response_data.success) {
      setUser(null);
      redirect("/login");
    } else {
      console.error({
        message: response_data.message || "User logout failed!",
      });
    }
  } catch (error) {
    console.error({
      message: error.message || "Something went wrong while logging out.",
    });
  }
}

// Apply to the job
export async function Apply(prevState, formdata) {
  const data = Object.fromEntries(formdata.entries());

  const formattedData = {
    job_id: data.job_id,
    applicantName: data.applicant_name,
    expectations: data.expectations,
    email: data.email,
    mobileNumber: data.mobile_number,
    experienceYears: data.experience,
    cv: "file",
  };

  try {
    const api_data = await fetch(
      "http://localhost:3000/api/applications/apply",
      {
        method: "post",
        body: JSON.stringify(formattedData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response_data = await api_data.json();

    if (api_data.ok && response_data) {
      return {
        ...prevState,
        success: true,
        message: response_data.message,
        data: response_data.data || null,
      };
    } else {
      return {
        ...prevState,
        success: false,
        error: true,
        message: response_data.message || "Application failed!",
      };
    }
  } catch (error) {
    return {
      ...prevState,
      success: false,
      error: true,
      message:
        error.message ||
        "Something went wrong while submitting the application.",
    };
  }
}
