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
