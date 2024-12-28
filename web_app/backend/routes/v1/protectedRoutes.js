const express = require('express');
const { protectRoute } = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/protected', protectRoute, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
