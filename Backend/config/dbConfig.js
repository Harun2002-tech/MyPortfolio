const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // .env ፋይልህ ውስጥ የሰጠኸውን MONGODB_URI ይጠቀማል
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB ተገናኝቷል...");
  } catch (err) {
    console.error("❌ MongoDB ግንኙነት አልተሳካም:", err.message);
    process.exit(1); // ስህተት ካለ ሰርቨሩ እንዲቆም ያደርጋል
  }
};

module.exports = connectDB;
