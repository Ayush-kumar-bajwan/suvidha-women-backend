import Volunteer from "../models/volunteerModel.js";

// Register Volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phoneNumber, expertise } = req.body;
    const volunteer = await Volunteer.create({
      name,
      email,
      phoneNumber,
      expertise,
    });
    res.status(201).json({ message: "Volunteer registered", volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve Volunteer
export const approveVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findByIdAndUpdate(id, { approvedByAdmin: true }, { new: true });
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json({ message: "Volunteer approved", volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    
    const stats = {
      total: volunteers.length,
      approved: volunteers.filter(v => v.approvedByAdmin).length,
      pending: volunteers.filter(v => !v.approvedByAdmin).length
    };

    res.status(200).json({
      volunteers,
      stats,
      message: "Volunteers fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Pending Volunteers
export const getPendingVolunteers = async (req, res) => {
  try {
    const pendingVolunteers = await Volunteer.find({ approvedByAdmin: false })
      .sort({ createdAt: -1 });

    res.status(200).json({
      volunteers: pendingVolunteers,
      total: pendingVolunteers.length,
      message: "Pending volunteers fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Approved Volunteers
export const getApprovedVolunteers = async (req, res) => {
  try {
    const approvedVolunteers = await Volunteer.find({ approvedByAdmin: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      volunteers: approvedVolunteers,
      total: approvedVolunteers.length,
      message: "Approved volunteers fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
