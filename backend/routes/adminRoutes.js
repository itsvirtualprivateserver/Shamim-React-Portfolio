const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const auth = require("../middlewares/auth");

// Public routes
router.post("/register", adminController.register);
router.post("/login", adminController.login);

// Protected routes
router.get("/profile", auth, adminController.getProfile);

module.exports = router;
