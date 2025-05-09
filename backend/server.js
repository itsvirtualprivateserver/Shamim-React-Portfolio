const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const requestRoutes = require("./routes/RequestRoutes");
const otpRoutes = require("./routes/OtpRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// CORS setup
const corsOptions = {
  origin: ["http://localhost:3000", "https://shamimimran.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/requests", requestRoutes);
app.use("/api/otp", otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
