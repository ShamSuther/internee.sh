"use server";

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
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response_data = await api_data.json();

  if (api_data.ok && response_data.success) {
    return {
      ...prevState,
      success: true,
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
        data: response_data.result || null,
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
