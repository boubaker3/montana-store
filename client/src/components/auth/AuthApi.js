import axiosInstance from "../Axios";

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const response = await axiosInstance.post("signup", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    // Handle error response, display error message, etc.
  }
};
