import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    enrollment: {
      type: String,
      required: true,
      trim: true,
      match: [/^[A-Za-z0-9-]+$/, "Invalid enrollment format"],
    },
    college: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    problem: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅ Prevent OverwriteModelError (important with Nodemon/Hot reload)
const Suggestion =
  mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;
