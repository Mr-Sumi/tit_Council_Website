const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer"); // your multer setup
const CouncilApplication = require("../models/CouncilApplication");


// ✅ Submit Application with files (max 3)
router.post("/apply", upload.array("files", 3), async (req, res) => {
    console.log(req.body);


//   try {
//     const { name, email, phone, enrollment, dob, gender, college, department, year, club, skills, motivation, terms } = req.body;

//     // ✅ Convert skills (if sent as comma-separated string from frontend)
//     let parsedSkills = [];
//     if (typeof skills === "string") {
//       parsedSkills = skills.split(",").map((s) => s.trim());
//     } else if (Array.isArray(skills)) {
//       parsedSkills = skills;
//     }

//     // ✅ Collect uploaded file data from Cloudinary (safe for undefined)
//     const uploadedFiles = Array.isArray(req.files) ? req.files.map((file) => ({
//       url: file.path,               // Cloudinary file URL
//       public_id: file.filename,     // Cloudinary file public ID
//       format: file.format,
//       resource_type: file.resource_type,
//     })) : [];

//     // ✅ Save to DB
//     const application = new CouncilApplication({
//       name,
//       email,
//       phone,
//       enrollment,
//       dob,
//       gender,
//       college,
//       department,
//       year,
//       club,
//       skills: parsedSkills,
//       motivation,
//       terms,
//       files: uploadedFiles,
//     });

//     await application.save();

//     res.status(201).json({ success: true, message: "Application submitted successfully!", data: application });
//   } catch (err) {
//     console.error("Error saving application:", err);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
});

module.exports = router;
