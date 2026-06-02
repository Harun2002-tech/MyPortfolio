const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const saveContact = async (req, res) => {
  const { fullName, email, mobile, subject, message } = req.body;

  try {
    // 1. ዳታውን MongoDB ውስጥ ማስቀመጥ
    const newContact = new Contact({
      fullName,
      email,
      mobile,
      subject,
      message,
    });
    await newContact.save();

    // 2. የBrevo (Sendinblue) Transporter ማዘጋጀት 
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // 👈 ወደ Brevo SMTP ተቀይሯል
      port: 587,                    // Brevo የሚጠቀመው አስተማማኝ ፖርት
      secure: false,                // ለፖርት 587 false መሆን አለበት
      auth: {
        user: process.env.EMAIL_USER, // Brevo ላይ ያለህ ኢሜይል
        pass: process.env.EMAIL_PASS, // ያንተ የ Brevo API Key (xkeysib...)
      },
    });

    // 3. የኢሜይል ይዘት
    const mailOptions = {
      from: process.env.EMAIL_USER, // 👈 መላክ ያለበት ከተፈቀደለት የBrevo ኢሜይልህ ነው
      to: process.env.EMAIL_USER,   // መልዕክቱ ለአንተ እንዲደርስህ
      subject: `New Portfolio Message: ${subject}`,
      html: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
              <h2 style="color: #333;">New Message Received From Portfolio!</h2>
              <p><b>Name:</b> ${fullName}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Phone:</b> ${mobile}</p>
              <p><b>Message:</b></p>
              <p style="background: #f9f9f9; padding: 10px; border-left: 5px solid #007bff;">${message}</p>
          </div>
      `,
    };

    // 4. ኢሜይሉን መላክ
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "መልዕክትህ በተሳካ ሁኔታ ተቀምጧል፣ በBrevo በኩል ኢሜይል ደርሶኛል!",
    });
  } catch (error) {
    console.error("Brevo Error Details:", error);

    res.status(500).json({
      success: false,
      message: "ስህተት አጋጥሟል፣ እባክህ ድጋሚ ሞክር።",
      error: error.message,
    });
  }
};

module.exports = { saveContact };