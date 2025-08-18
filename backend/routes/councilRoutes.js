const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const CouncilApplication = require("../models/CouncilApplication");

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

    let parsedSkills = [];
    if (skills) {
      if (typeof skills === "string") {
        try {
          parsedSkills = JSON.parse(skills);
        } catch {
          parsedSkills = skills.split(",").map((s) => s.trim());
        }
      } else if (Array.isArray(skills)) {
        parsedSkills = skills;
      }
    }

    const uploadedFiles = Array.isArray(req.files)
      ? req.files.map((file) => ({
          url: file.path,                   // Cloudinary URL
          public_id: file.filename,         // Cloudinary public_id
          original_name: file.originalname, // user's original filename
          format: file.mimetype.split("/")[1],       // e.g. pdf, png
          resource_type: file.mimetype.split("/")[0] // e.g. application, image
        }))
      : [];
    console.log("✅ Processed Files:", uploadedFiles);
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
      terms: terms === "true" || terms === true || terms === "on", // normalize
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
