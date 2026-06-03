import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../config/firebase";

// Brevo — set in .env (VITE_*) or replace placeholders below.
// Get API key: https://app.brevo.com/settings/keys/api
const BREVO_API_KEY =
  import.meta.env.VITE_BREVO_API_KEY ?? "YOUR_BREVO_API_KEY";
const BREVO_SENDER_EMAIL =
  import.meta.env.VITE_BREVO_SENDER_EMAIL ?? "your-sender@example.com";
const BREVO_RECEIVER_EMAIL =
  import.meta.env.VITE_BREVO_RECEIVER_EMAIL ?? "your-receiver@example.com";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 5000,
  className: "custom-toast",
  progressClassName: "custom-progress",
};

function isBrevoConfigured() {
  return (
    BREVO_API_KEY &&
    BREVO_API_KEY !== "YOUR_BREVO_API_KEY" &&
    BREVO_SENDER_EMAIL &&
    BREVO_SENDER_EMAIL !== "your-sender@example.com" &&
    BREVO_RECEIVER_EMAIL &&
    BREVO_RECEIVER_EMAIL !== "your-receiver@example.com"
  );
}

function trimField(value, maxLength) {
  return (value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendBrevoEmail(payload) {
  const subjectLine = payload.subject || "No Subject";

  const response = await fetch(BREVO_SMTP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        email: BREVO_SENDER_EMAIL,
        name: "Portfolio Contact",
      },
      to: [
        {
          email: BREVO_RECEIVER_EMAIL,
          name: "Harun",
        },
      ],
      subject: `New Portfolio Message: ${subjectLine}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #333;">New Message From Your Portfolio!</h2>
          <p><b>Name:</b> ${escapeHtml(payload.fullName)}</p>
          <p><b>Email:</b> ${escapeHtml(payload.email)}</p>
          <p><b>Phone:</b> ${escapeHtml(payload.mobile || "N/A")}</p>
          <p><b>Subject:</b> ${escapeHtml(subjectLine)}</p>
          <p><b>Message:</b></p>
          <p style="background: #f9f9f9; padding: 10px; border-left: 5px solid #007bff;">${escapeHtml(payload.message)}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Brevo API error (${response.status})`);
  }
}

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName: trimField(formData.fullName, 120),
      email: trimField(formData.email, 254),
      mobile: trimField(formData.mobile, 30),
      subject: trimField(formData.subject, 200),
      message: trimField(formData.message, 5000),
    };

    if (!payload.fullName || !payload.email || !payload.message) {
      toast.error("Please fill in name, email, and message.", TOAST_OPTIONS);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Save to Firestore first (works on Firebase Spark plan)
      await addDoc(collection(db, "contacts"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      // Step 2: Send email via Brevo from the browser (no Firebase Blaze plan)
      if (!isBrevoConfigured()) {
        console.warn(
          "Brevo is not configured. Set VITE_BREVO_* in .env (see .env.example)."
        );
        toast.warning(
          "Message saved. Email notifications are not configured yet.",
          TOAST_OPTIONS
        );
      } else {
        try {
          await sendBrevoEmail(payload);
          toast.success(
            "Message sent! You should receive an email notification shortly.",
            TOAST_OPTIONS
          );
        } catch (emailError) {
          console.error("Brevo error:", emailError);
          toast.warning(
            "Message saved, but the email notification failed to send.",
            TOAST_OPTIONS
          );
        }
      }

      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error(
        error?.code === "permission-denied"
          ? "Access denied. Update Firestore security rules (see firestore.rules.example)."
          : "Failed to save your message. Please try again.",
        TOAST_OPTIONS
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <ToastContainer />

      <h2 className="heading">
        Contact <span>Me!</span>
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-box">
          <input
            type="text"
            id="contact-fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            maxLength={120}
            required
            aria-required="true"
          />
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={254}
            required
            aria-required="true"
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            id="contact-mobile"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            autoComplete="tel"
            maxLength={30}
          />
          <input
            type="text"
            id="contact-subject"
            name="subject"
            placeholder="Email Subject"
            value={formData.subject}
            onChange={handleChange}
            maxLength={200}
          />
        </div>
        <textarea
          id="contact-message"
          name="message"
          cols="30"
          rows="10"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          maxLength={5000}
          required
          aria-required="true"
        ></textarea>

        <button
          type="submit"
          className="btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

export default Contact;
