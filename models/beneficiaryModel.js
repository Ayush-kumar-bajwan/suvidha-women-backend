import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    healthConcerns: { type: [String] },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
export default Beneficiary;
