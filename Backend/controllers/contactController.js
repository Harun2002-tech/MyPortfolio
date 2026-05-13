const nodemailer = require("nodemailer");
const Contact = require("../models/Contact"); // አዲሱን ሞዴል እዚህ ጋር ጥራው

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

    // 2. Nodemailer transporter ማዘጋጀት
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. የኢሜይል ይዘት
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message: ${subject}`,
      html: `
          <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
              <h2 style="color: #333;">New Message Received!</h2>
              <p><b>From:</b> ${fullName}</p>
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
      message: "መልዕክትህ በተሳካ ሁኔታ ተቀምጧል፣ ኢሜይልም ደርሶኛል!",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "ስህተት አጋጥሟል፣ እባክህ ድጋሚ ሞክር።",
    });
  }
};

module.exports = { saveContact };
