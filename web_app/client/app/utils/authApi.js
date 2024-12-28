import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Signup API call
export const signup = async (
  name,
  email,
  password,
  country,
  state,
  city,
  street
) => {
  try {
    console.log("Signup called");
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      country,
      state,
      city,
      street,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};
