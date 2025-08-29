const express = require("express");
const router = express.Router();
const Registration = require("../models/EventRegistration");

// POST - Create Registration
router.post("/event", async (req, res) => {
  console.log(req.body);
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ message: "✅ Registration Successful", data: newRegistration });
  } catch (error) {
    res.status(400).json({ message: "❌ Error saving registration", error });
  }
});

// GET - Fetch All Registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching registrations", error });
  }
});

module.exports = router;
