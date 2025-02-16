import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import emailRoutes from './routes/emailRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import path from 'path';


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://womania-happy-health.web.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// static files
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect Database


// Routes
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admins", adminRoutes);
app.use('/api/contact',emailRoutes);
app.use('/api/events', eventRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>{
  connectDB();
  console.log(`Server running on port ${PORT}`)
});

server.timeout = 60000;
