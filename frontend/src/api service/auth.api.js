import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
console.log('api',api);


export const registerUser = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/auth/register", data); // Only use the relative path here
      console.log('response', response);
  
      const result = response.data;
      localStorage.setItem("authdata", JSON.stringify(result.data)); // Store the result in localStorage
  
      return result; // You can return the result directly here
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };
  
export const loginUser = async (data) => {
    try {
      const response = await api.post("/auth/login", data); // Only use the relative path here
      console.log('response', response);
  
      const result = response.data;
      localStorage.setItem("authdata", JSON.stringify(result.data)); // Store the result in localStorage
  
      return result; // You can return the result directly here
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };
