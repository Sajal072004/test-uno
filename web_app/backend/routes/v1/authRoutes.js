const express = require("express");
const { register, login, fetchUserDetails, updateUserDetails } = require("../../controllers/authController");
const {verifyToken} = require('../../services/authService');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", verifyToken);
router.get("/user-details", fetchUserDetails);
router.put('/update-user-details' , updateUserDetails);



module.exports = router;
