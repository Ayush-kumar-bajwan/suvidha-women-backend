import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const admin = await Admin.findById(decoded.id); // Find admin by decoded ID

    if (!admin) {
      return res.status(401).json({ message: "Not authorized, admin not found" });
    }

    req.admin = admin; // Attach admin to request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === "admin") {
    next(); // Allow access if role is admin
  } else {
    res.status(403).json({ message: "Access denied, only admins allowed" });
  }
};
