const express = require("express");
const router = express.Router();
const Request = require("../models/Request"); // singular name for the model

// Create Request
router.post("/request", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
