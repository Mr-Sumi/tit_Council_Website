const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  event: { type: String, required: true },
  utrNumber: { type: String, required: true },
  members: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      college: { type: String, required: true },
    },
  ],
});

// ✅ OverwriteModelError fix
const Registration =
  mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);

module.exports = Registration;
