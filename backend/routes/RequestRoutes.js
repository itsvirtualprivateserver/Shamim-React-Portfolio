const express = require("express");
const router = express.Router();
const Request = require("../models/Request"); // singular name for the model
const requestController = require("../controller/requestController");
const auth = require("../middlewares/auth");
// Create Request
router.post("/create", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const newRequest = await Request.create({
      name,
      email,
      phone,
      subject,
      message,
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get all Requests
router.get("/get-all-req", auth, requestController.getAllRequests);

module.exports = router;
