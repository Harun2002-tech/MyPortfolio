export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
      console.error("Brevo API error:", response.status, errorBody);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: error.message });
  }
}
