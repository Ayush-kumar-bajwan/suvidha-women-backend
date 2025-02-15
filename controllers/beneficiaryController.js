import Beneficiary from "../models/beneficiaryModel.js";

// Register Beneficiary
export const registerBeneficiary = async (req, res) => {
  try {
    const { name, age, phoneNumber, location, healthConcerns } = req.body;
    const beneficiary = await Beneficiary.create({
      name,
      age,
      phoneNumber,
      location,
      healthConcerns,
    });
    res.status(201).json({ message: "Beneficiary registered", beneficiary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get all
export const getAllBeneficiaries = async (req, res) => {
  try {
    // You can add pagination here if needed
    const beneficiaries = await Beneficiary.find({})
      .sort({ createdAt: -1 }); // Sort by newest first
    
    // Count total beneficiaries
    const totalBeneficiaries = await Beneficiary.countDocuments();
    
    res.status(200).json({ 
      beneficiaries,
      total: totalBeneficiaries,
      message: "Beneficiaries fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
