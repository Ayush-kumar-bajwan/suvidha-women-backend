// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Volunteer",
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  registeredBeneficiaries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beneficiary"
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'expired'],
    default: 'upcoming'
  },
  healthCategory: {
    type: String,
    required: true,
    enum: ['Pregnancy', 'Cancer Awareness', 'Eye Health', 'Obesity', 'General Wellness', 'Other']
  },
  image: {
    type: String,
    default: '/default-event-image.jpg'
  }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;