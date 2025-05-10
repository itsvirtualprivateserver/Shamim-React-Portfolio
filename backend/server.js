const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Route imports
const requestRoutes = require("./routes/RequestRoutes");
const otpRoutes = require("./routes/OtpRoutes");
const adminRoutes = require("./routes/adminRoutes"); // New admin routes

dotenv.config();
connectDB();

const app = express();

// CORS setup
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://shamimimran.vercel.app",
    "https://portfolio-backend-njcj.onrender.com",
    "https://shamimimran.vercel.app/",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/requests", requestRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/admin", adminRoutes); // New admin routes

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
