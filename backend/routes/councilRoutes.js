// routes/council.route.js
const express = require("express");
const router = express.Router();
const CouncilApplication = require("../models/CouncilApplication");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Nodemailer transporter (use env vars for credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER, // from .env
    pass: process.env.MAIL_PASS, // from .env
  },
});

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

    // Send confirmation email
    const mailOptions = {
      from: {
        name: "Student Council",
        address: process.env.MAIL_USER, // safer
      },
      to: email,
      subject: "Welcome to Student Council – Application Received",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>Hi ${name},</h2>
          <p>Thank you for showing your interest in joining the <strong>Student Council</strong>.</p>
          <p>We have received your application for the <strong>${club}</strong> club. Our team will review your details and contact you as soon as possible.</p>
          <p style="color: #e74c3c;"><em>Please do not reply to this email – it is auto-generated.</em></p>
          <br/>
          <p>Best Regards,<br/>Student Council Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "✅ Application submitted successfully! Confirmation email sent.",
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
