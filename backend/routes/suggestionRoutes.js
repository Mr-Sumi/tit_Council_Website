const express = require("express");
const Suggestion = require("../models/suggestion"); // Use capital S

const router = express.Router();

// Submit a suggestion
router.post("/", async (req, res) => {
  try {
    const newSuggestion = new Suggestion({
      name: req.body.name,
      enrollment: req.body.enrollment,
      college: req.body.college,
      problem: req.body.problem,
      solution: req.body.solution,
    });

    await newSuggestion.save(); // Save the instance

    res.status(201).json({
      success: true,
      message: "Suggestion submitted successfully",
      suggestion: newSuggestion,
    });
  } catch (error) {
    console.error("Error submitting suggestion:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
