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
