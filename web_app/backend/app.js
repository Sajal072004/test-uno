const express = require("express");
const authRoutes = require("./routes/v1/authRoutes.js");
const protectedRoutes = require("./routes/v1/protectedRoutes.js");
const chatRoutes = require("./routes/v1/chatRoutes.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", protectedRoutes);
app.use("/api/v1", chatRoutes);

app.use("/", () => {
  console.log("hello");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
