const mongoose = require("mongoose");

const councilSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate registrations
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
  },

  enrollment: {
    type: String,
    required: true,
    trim: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  college: {
    type: String,
    enum: ["TIT", "TITE", "TITS", "TIT-CSE"],
    required: true,
  },

  department: {
    type: String,
    enum: [
      "CSE","CSE AIML","CSE AI","CSE DS","CSE AIDS","CSE Cyber",
      "CSE IoT","IT","EX","EC","ME","CE","B.Pharm","MBA","Law"
    ],
    required: true,
  },

  year: {
    type: String,
    enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    required: true,
  },

  club: {
    type: String,
    required: true,
  },

  skills: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length <= 15;
      },
      message: "Maximum 15 skills allowed",
    },
    default: [],
  },

  motivation: {
    type: String,
    required: true,
    maxlength: 1000, // keep reasonable length
  },

  files: [
    {
      filename: { type: String },
      path: { type: String },   // Cloudinary URL will be saved here
      mimetype: { type: String },
      size: { type: Number },
    },
  ],

  terms: {
    type: Boolean,
    required: true,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CouncilApplication", councilSchema);
