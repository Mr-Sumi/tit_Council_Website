// routes/council.route.js
const express = require("express");
const router = express.Router();
const CouncilApplication = require("../models/CouncilApplication");

// POST /council/apply
router.post("/apply", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      enrollment,
      dob,
      gender,
      college,
      department,
      year,
      club,
      motivation,
      terms,
    } = req.body;

    console.log("📥 Incoming Body:", req.body);

    // Normalize terms checkbox
    const acceptedTerms =
      terms === true || terms === "true" || terms === "on" ? true : false;

    // Create application document
    const application = new CouncilApplication({
      name,
      email,
      phone,
      enrollment,
      dob,
      gender,
      college,
      department,
      year,
      club,
      motivation,
      terms: acceptedTerms,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "✅ Application submitted successfully!",
      data: application,
    });
  } catch (err) {
    console.error("❌ Error saving application:", err);
    res.status(500).json({
      success: false,
      message: "Server error while saving application",
      error: err.message,
    });
  }
});

module.exports = router;
