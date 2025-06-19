const nodemailer = require("nodemailer");
const Request = require("../models/Request");


const createRequest = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD,
      },
    });
    
    const { name, email, phone, subject, message } = req.body;
    
    const newRequest = await Request.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    const mailOptions = {
      from: `"Shamim Imran" ${process.env.MY_EMAIL}`,
      to: email,
      subject: "✨ Thank you for reaching out!",
      html: `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family: 'Helvetica Neue', sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; color: #fff; text-align: center;">
          <h1 style="margin:0; font-size: 28px;">Hey ${name},</h1>
          <p style="margin-top: 8px; font-size: 16px;">Your message landed in my inbox! ✨</p>
        </div>

        <!-- Main Body -->
        <div style="padding: 32px; text-align: left; color: #374151;">
          <p style="font-size: 16px; margin-bottom: 16px;">Thanks so much for taking the time to reach out through my portfolio. Here's a quick summary of what you submitted:</p>

          <div style="background: #f9fafb; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #6366f1;">
            <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 4px 0;"><strong>Message:</strong> ${message}</p>
          </div>

          <p style="font-size: 16px; margin-bottom: 24px;">I’ll review it and get back to you as soon as I can. Meanwhile, feel free to explore more of my work and connect with me on socials below.</p>

          <!-- CTA Button -->
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="https://shamimimran.vercel.app/" style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">🔗 Visit My Portfolio</a>
          </div>

          <!-- Social Links -->
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://linkedin.com/in/iamshamimimran" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn" /></a>
            <a href="https://github.com/iamshamimimran" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub" /></a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Shamim Imran. Made with ❤️ and React.
        </div>
      </div>
    </div>
  `,
    };
    // Send the email
 
    await transporter.sendMail(mailOptions);
      

   return  res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 }); // newest first
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRequests,
  createRequest,
};
