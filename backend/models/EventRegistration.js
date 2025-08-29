const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
  event: { type: String, required: true },
  category: { type: String, default: "solo" },
  utrNumber: { type: String, required: true },
  members: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      enrollmentNo: { type: String, required: true },
    },
  ],
});

// ✅ Unique model name to avoid OverwriteModelError
const EventRegistration =
  mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", EventRegistrationSchema);

module.exports = EventRegistration;
