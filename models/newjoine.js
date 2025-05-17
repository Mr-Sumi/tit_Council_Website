const mongoose = require('mongoose');

const councilSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  enrollment: {
    type: String,
    required: true,
    maxlength: 12,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
    enum: [
      'CSE', 'CSE AIML', 'CSE AI', 'CSE DS', 'CSE AIDS', 'CSE Cyber', 'CSE IoT',
      'IT', 'EX', 'EC', 'ME', 'CE', 'B.Pharm', 'MBA', 'Law'
    ],
  },
  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  },
  club: {
    type: String,
    required: true,
    enum: [
      'Drone Society', 'Coding Club', 'Robotics Club', 'Photography Club',
      'Cyber Security Club', 'AI & ML Club', 'Gaming Club', 'Music Club',
      'Debate Club', 'Drama Club'
    ],
  },
  skills: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,  // Indian 10-digit phone validation
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email validation
  },
  why: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CouncilApplicant', councilSchema);
