// routes/council.route.js
const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const CouncilApplication = require("../models/CouncilApplication");

// POST /council/apply
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

    console.log("📥 Incoming Body:", req.body);
    console.log("📂 Incoming Files:", req.files);

    // ✅ Parse skills safely
    let parsedSkills = [];
    if (skills) {
      if (typeof skills === "string") {
        try {
          parsedSkills = JSON.parse(skills); // case: frontend sent JSON.stringify
        } catch {
          parsedSkills = skills.split(",").map((s) => s.trim()); // fallback
        }
      } else if (Array.isArray(skills)) {
        parsedSkills = skills;
      }
    }

    // ✅ Normalize file data (Cloudinary / Multer-Storage-Cloudinary)
    const uploadedFiles = (req.files || []).map((file) => ({
      url: file.path, // Cloudinary secure_url
      public_id: file.filename || file.public_id, // Cloudinary public_id
      original_name: file.originalname,
      format: file.mimetype?.split("/")[1] || "",
      resource_type: file.mimetype?.split("/")[0] || "",
    }));

    console.log("✅ Processed Files:", uploadedFiles);

    // ✅ Normalize terms
    const acceptedTerms =
      terms === true || terms === "true" || terms === "on" ? true : false;

    // ✅ Create application document
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
      terms: acceptedTerms,
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
      message: "Server error while saving application",
      error: err.message,
    });
  }
});

module.exports = router;
