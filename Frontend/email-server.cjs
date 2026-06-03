require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { fullName, email, mobile, subject, message } = req.body;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: process.env.EMAIL_USER, name: "Portfolio Contact" },
        to: [{ email: process.env.EMAIL_USER, name: "Harun" }],
        subject: `New Portfolio Message: ${subject || "No Subject"}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #333;">New Message From Your Portfolio!</h2>
            <p><b>Name:</b> ${fullName}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${mobile || "N/A"}</p>
            <p><b>Subject:</b> ${subject || "N/A"}</p>
            <p><b>Message:</b></p>
            <p style="background: #f9f9f9; padding: 10px; border-left: 5px solid #007bff;">${message}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Brevo error:", response.status, errorBody);
      return res.status(500).json({ error: "Email failed" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Email server error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});
