"use server";

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

// file upload
const handleUpload = async (file) => {
  if (!file) {
    console.warn("No file provided. Upload aborted.");
    return null;
  }

  try {
    const cloudName = "ddb5pk7pd";
    const uploadPreset = "unsigned_file_preset";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload error:", errorData);
      return null;
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return error;
  }
};

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
  };

  const fileUrl = await handleUpload(data.file);

  try {
    if (!fileUrl) {
      return {
        ...prevState,
        success: false,
        error: true,
        message: "Application failed!",
      };
    }
    
    formattedData.cv = fileUrl;
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
