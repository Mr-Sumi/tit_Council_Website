import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  institution: { type: String, required: true },
  skills: { type: String },
  role: { type: String, enum: ["leader", "member"], required: true },
});

const registrationSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String },
    members: {
      type: [memberSchema],
      validate: {
        validator: function (v) {
          return v.length === 6;
        },
        message: "Team must have exactly 6 members",
      },
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
