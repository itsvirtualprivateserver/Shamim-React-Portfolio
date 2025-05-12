const express = require("express");
const router = express.Router();
const requestController = require("../controller/requestController");
const auth = require("../middlewares/auth");
// Create Request
router.post("/create", requestController.createRequest);
// Get all Requests
router.get("/get-all-req", auth, requestController.getAllRequests);

module.exports = router;
