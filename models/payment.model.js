const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  enrollment: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['leader', 'member', null],
    default: null
  }
});

const registrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  participantType: {
    type: String,
    required: true,
    enum: ['solo', 'duo', 'trio', 'squad-4-member', 'squad-5-member']
  },
  college: {
    type: String,
    required: true
  },
  participants: [participantSchema],
  paymentId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['paid', 'failed', 'pending'],
    default: 'paid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);