const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
// Route imports
const requestRoutes = require("./routes/RequestRoutes");
const otpRoutes = require("./routes/OtpRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://shamim.devtool.store",
  credentials: true,
};
app.use(cors(corsOptions));


// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes
app.use("/api/requests", requestRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/admin", adminRoutes);




// Test route
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
