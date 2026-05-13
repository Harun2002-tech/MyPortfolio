require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig"); // የ MongoDB ግንኙነት ፋይል
const contactRoute = require("./routes/contactRoute");

const app = express();

// 1. Middleware ማስተካከያ
// Frontend_URL localhost ከሰጠኸው ለጊዜው cors() ብቻ ብታደርገው ለሙከራ ይቀልሃል
app.use(cors());
app.use(express.json());

// 2. Routes
app.use("/api", contactRoute);

// 3. ሰርቨሩን የማስነሻ ዘዴ
const startServer = async () => {
  try {
    // ከ MySQL createTables ፋንታ MongoDB-ን እናገናኛለን
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("✅ MongoDB is successfully connected!");
    });
  } catch (err) {
    console.error("❌ Starting Error:", err.message);
  }
};

startServer();
