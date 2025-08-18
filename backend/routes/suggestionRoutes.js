const express = require("express");
const suggestion = require("../models/suggestion"); // ✅ no .js needed in CJS

const router = express.Router();

// ✅ Submit a suggestion
router.post("/", async (req, res) => {
  try {
    const Suggestion = new suggestion(
      {
        name: req.body.name,
        enrollment: req.body.enrollment,
        college: req.body.college,
        problem: req.body.problem,
        solution: req.body.solution,
      }
    );
    await suggestion.save();
    res.status(201).json({
      success: true,
      message: "Suggestion submitted successfully",
      suggestion,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router; // ✅ CommonJS export
