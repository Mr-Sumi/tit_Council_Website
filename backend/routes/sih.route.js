import express from "express";
import Registration from "../models/registration.model.js";

const router = express.Router();

// @route   POST /api/registration
// @desc    Register a new team
router.post("/", async (req, res) => {
  try {
    const { teamName, category, description, members } = req.body;

    // Validation
    if (!teamName || !category || !members) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    if (members.length !== 6) {
      return res.status(400).json({ success: false, message: "Team must have 6 members" });
    }

    if (!members.some((m) => m.gender === "female")) {
      return res.status(400).json({ success: false, message: "At least one female member is required" });
    }

    if (members.filter((m) => m.role === "leader").length !== 1) {
      return res.status(400).json({ success: false, message: "Exactly one leader is required" });
    }

    // Save
    const newRegistration = new Registration({
      teamName,
      category,
      description,
      members,
    });

    await newRegistration.save();

    res.json({ success: true, message: "Team registered successfully!" });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Team name already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
