const nodemailer = require("nodemailer");

// In-memory OTP store (use DB or Redis in production)
const otpStore = {}; // { email: { otp, expiresAt } }

const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set OTP expiration time: 10 minutes from now
  const expiresAt = Date.now() + 10 * 60 * 1000;

  // Store OTP in memory
  otpStore[email] = { otp, expiresAt };

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Portfolio Request" <${process.env.MY_EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully!" }); // Do NOT send OTP in production
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Optional: verifyOtp handler
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const stored = otpStore[email];

  if (!stored) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  if (Date.now() > stored.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP is valid
  delete otpStore[email]; // Optional: remove after use
  return res.status(200).json({ message: "OTP verified successfully" });
};

module.exports = { sendOtp, verifyOtp };
