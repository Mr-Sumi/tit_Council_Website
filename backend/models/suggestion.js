const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    enrollment: { type: String, required: true, trim: true},
    college: { type: String, required: true, trim: true},
    problem: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    solution: { type: String, required: true, trim: true, minlength: 5, maxlength: 2000 },
  },
  { timestamps: true, versionKey: false }
);

const Suggestion = mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion; // ✅ CommonJS export
