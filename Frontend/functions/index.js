import { onDocumentCreated } from "firebase-functions/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const brevoApiKey = defineSecret("BREVO_API_KEY");
const emailUser = defineSecret("EMAIL_USER");

export const onContactCreated = onDocumentCreated(
  { document: "contacts/{docId}", secrets: [brevoApiKey, emailUser] },
  async (event) => {
    const data = event.data.data();
    const { fullName, email, mobile, subject, message } = data;

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey.value(),
      },
      body: JSON.stringify({
        sender: { email: emailUser.value(), name: "Portfolio Contact" },
        to: [{ email: emailUser.value(), name: "Harun" }],
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
  }
);
