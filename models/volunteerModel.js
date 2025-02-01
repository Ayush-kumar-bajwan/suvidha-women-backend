import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    expertise: { type: String, required: true },
    approvedByAdmin: { type: Boolean, default: false },
    eventsHosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;
