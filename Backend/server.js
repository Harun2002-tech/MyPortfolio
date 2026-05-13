require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const contactRoute = require("./routes/contactRoute");

const app = express();

// 1. Middleware ማስተካከያ
app.use(
  cors({
    // የ Frontend ሊንክህ (መጨረሻው ላይ '/' መኖር የለበትም)
    origin: ["https://harunahmed.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// 2. Routes

// ለ Render "Live" መሆኑን በብሮውዘር መፈተሻ (Root Route)
app.get("/", (req, res) => {
  res.send("🚀 Harun's Portfolio Backend is Live and Running!");
});

// የ Contact API route
app.use("/api", contactRoute);

// 3. ሰርቨሩን የማስነሻ ዘዴ
const startServer = async () => {
  try {
    // MongoDB-ን እናገናኛለን
    await connectDB();

    // Render በራሱ የሚሰጠውን PORT ይጠቀማል፣ ካልተሰጠ 5000 ይጠቀማል
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log("✅ MongoDB is successfully connected!");
    });
  } catch (err) {
    console.error("❌ Starting Error:", err.message);
    // ከባድ ስህተት ካለ ሰርቨሩ እንዲቆም ያደርጋል
    process.exit(1);
  }
};

startServer();
