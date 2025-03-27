const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Storage (Temporary Storage in Memory)
const storage = multer.memoryStorage();

// File Filter (Only Allow Image Files)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Function to Convert Image to Hexadecimal
const imageToHex = (buffer) => {
  return buffer.toString('hex');
};

module.exports = { upload, imageToHex };
