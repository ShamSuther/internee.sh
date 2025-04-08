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
  console.log(data);
  const api_data = await fetch("http://localhost:3000/api/auth/register", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response_data = await api_data.json();
  console.log(response_data.result);
  //   if (response_data) {
  //     const userData = JSON.stringify(response_data.result);
  //     console.log(userData);
  //     return { ...prevState, success: true, message: "user registered!" };
  //   } else {
  //   }
  return {
    ...prevState,
    success: false,
    error: true,
    message: "registration failed!",
  };
}

export async function Apply(prevState, formdata) {
  const data = Object.fromEntries(formdata.entries());
  return {
    data,
    success: true,
    error: false,
    message: "applied!",
  };
}
