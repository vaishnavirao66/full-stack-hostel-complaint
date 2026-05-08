import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: String,

  description: String,

  category: {
    type: String,
    default: "General",
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;