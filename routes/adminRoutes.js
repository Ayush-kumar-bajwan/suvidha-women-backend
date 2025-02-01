import express from "express";
import { adminLogin, createAdmin } from "../controllers/adminController.js";
import { protectAdmin, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin Login (Public)
router.post("/login", adminLogin);

// ✅ Create Admin (Protected, only admins can create another admin)
router.post("/register", protectAdmin, isAdmin, createAdmin);

export default router;
