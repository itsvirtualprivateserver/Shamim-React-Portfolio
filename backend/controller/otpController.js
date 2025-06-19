const nodemailer = require("nodemailer");

// In-memory OTP store (use DB or Redis in production)
const otpStore = {}; // { email: { otp, expiresAt } }

const sendOtp = async (req, res) => {
  const { email } = req.sbody;

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
    from: `"verify you are not a robot" <${process.env.MY_EMAIL}>`,
    to: email,
    subject: "Let's verify your email address",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                padding: 20px 0;
                background-color: #4a6fa5;
                color: white;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 30px;
                background-color: #f9f9f9;
                border-radius: 0 0 8px 8px;
                border: 1px solid #e1e1e1;
                border-top: none;
            }
            .otp-code {
                font-size: 28px;
                letter-spacing: 5px;
                text-align: center;
                margin: 25px 0;
                padding: 15px;
                background-color: #e8f0fe;
                color: #1a73e8;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4a6fa5;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>Email Verification</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for reaching out through my portfolio website. Please use the following One-Time Password (OTP) to verify your email address:</p>
            
            <div class="otp-code">${otp}</div>
            
            <p>This code is valid for <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.</p>
            
            <p>Best regards,<br>${process.env.MY_NAME || "Portfolio Owner"}</p>
            
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `,
    text: `Your OTP is ${otp}. It is valid for 10 minutes. If you didn't request this, please ignore this email.`,
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
