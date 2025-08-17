const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer"); // <-- Cloudinary + multer setup
const CouncilApplication = require("../models/CouncilApplication");

// ✅ Submit Application with files (max 3)
router.post("/apply", upload.array("files", 3), async (req, res) => {
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
      skills,
      motivation,
      terms,
    } = req.body;

    // ✅ Convert skills (string -> array)
    let parsedSkills = [];
    if (skills) {
      if (typeof skills === "string") {
        parsedSkills = skills.split(",").map((s) => s.trim());
      } else if (Array.isArray(skills)) {
        parsedSkills = skills;
      }
    }

    // ✅ Collect uploaded file data from Cloudinary
    const uploadedFiles = Array.isArray(req.files)
      ? req.files.map((file) => ({
          url: file.path,                       // Cloudinary file URL
          public_id: file.filename || file.public_id, // safer fallback
          original_name: file.originalname,     // user's uploaded file name
          format: file.format,
          resource_type: file.resource_type,
        }))
      : [];

    console.log("✅ Processed Files:", uploadedFiles);

    // ✅ Save to MongoDB
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
      skills: parsedSkills,
      motivation,
      terms: terms === "true" || terms === true, // normalize to boolean
      files: uploadedFiles,
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
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;
