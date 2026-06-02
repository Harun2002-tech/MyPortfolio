const Contact = require("../models/Contact");

const saveContact = async (req, res) => {
  const { fullName, email, mobile, subject, message } = req.body;

  try {
    // 1. Save data to MongoDB
    const newContact = new Contact({ fullName, email, mobile, subject, message });
    await newContact.save();

    // 2. Send email via Brevo API v3
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.EMAIL_PASS,
      },
      body: JSON.stringify({
        sender: { email: process.env.EMAIL_USER, name: "Portfolio Contact" },
        to: [{ email: process.env.EMAIL_USER, name: "Harun" }],
        subject: `New Portfolio Message: ${subject || "No Subject"}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #333;">New Message Received From Portfolio!</h2>
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
      throw new Error(`Brevo API error: ${response.status} ${errorBody}`);
    }

    res.status(200).json({
      success: true,
      message: "Message received, thank you!",
    });
  } catch (error) {
    console.error("Brevo Error Details:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred, please try again.",
      error: error.message,
    });
  }
};

module.exports = { saveContact };