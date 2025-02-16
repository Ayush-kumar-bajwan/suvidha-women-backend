import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

// Connect to MongoDB before starting the server
await connectDB();  // ✅ Fix: Connect DB before listening

const app = express();

// Middleware
app.use(express.json());

// ✅ Fix: Proper CORS settings
app.use(
  cors({
    origin: ["https://womania-happy-health.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static files
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/contact", emailRoutes);
app.use("/api/events", eventRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
