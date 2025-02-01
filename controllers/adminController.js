import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    const admin = await Admin.findOne({ email });
    if (!admin) {
     
      return res.status(404).json({ message: "Admin not found" });
    }

   

    // Compare the entered plain password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
   

    if (!isMatch) {
     
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.status(200).json({ message: "Admin logged in", token });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};
// ✅ Create Admin (Only accessible by another admin)
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "New admin created", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
