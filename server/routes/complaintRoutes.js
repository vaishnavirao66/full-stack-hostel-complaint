import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// CREATE complaint
router.post("/", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const saved = await complaint.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE complaint
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json("Deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;