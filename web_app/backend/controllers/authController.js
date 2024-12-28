const { registerUser, loginUser, getUserDetails, updateUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { email, password, name, country, state , city , street } = req.body;
    const {user , token} = await registerUser(email, password, name, country, state , city , street);
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    await getUserDetails(req, res);
  } catch (err) {
    console.error("Error in fetchUserDetails:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

const updateUserDetails = async (req,res) => {
  try {
    // Call the updateUser service with the request and response objects
    await updateUser(req, res);
  } catch (error) {
    console.error("Error in updateUserDetails controller:", error);
    // Handle any unexpected errors
    res.status(500).json({ message: "Something went wrong while updating user details" });
  }
}


module.exports = { register, login, fetchUserDetails, updateUserDetails };
