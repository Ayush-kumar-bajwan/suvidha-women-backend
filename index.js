import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database


// Routes
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admins", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  connectDB();
  console.log(`Server running on port ${PORT}`)
});
