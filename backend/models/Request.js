const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
  name: String,
  email: { type: String },
  phone: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Requests", requestsSchema);
