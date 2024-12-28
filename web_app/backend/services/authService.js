const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const jwt = require('jsonwebtoken');

const registerUser = async (email, password, name,country, state , city , street) => {
  // Hash the password before saving
  const hashedPassword = await hashPassword(password);

  // Save the user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      country,
      state,
      city,
      street
    },
  });

  const token = generateToken(user.id);
  return { user, token };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the hashed password
  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = generateToken(user.id);

  return { user, token };
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      console.log("Token not provided");
      return res.status(401).json({ error: "Token not provided" });
    }

    console.log("Received Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log("Decoded Token:", decoded);

    res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Decode the token to extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("the decoded is ", decoded);
    const userId = decoded.userId;

    console.log("Decoded User ID:", userId);

    // Fetch user details from the database using the user ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        country: true,
        state: true,
        city: true,
        street: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user details:", err.message);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

const updateUser = async (req, res) => {
  if (req.method === "PUT") {
    try {
      // Step 1: Retrieve the token from the Authorization header
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token is missing or invalid" });
      }

      // Step 2: Decode the token to get the userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

     
      const { name, email, city, street, state, country } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          city,
          street,
          state,
          country,
        },
      });

      // Step 6: Return the updated user data
      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: "Invalid token" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
};



module.exports = { registerUser, loginUser, verifyToken, getUserDetails, updateUser }
