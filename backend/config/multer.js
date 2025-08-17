const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); 

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'uploads';
    let format = file.mimetype === 'application/pdf' ? 'pdf' : 'png'; 
    let public_id = file.originalname.split('.')[0]; 

    return { folder, format, public_id };
  },
});


// 🔹 File Filter (Only Allow PDF, JPG, PNG, JPEG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, JPEG, and PDF files are allowed!'), false);
  }
};


// 🔹 Multer Upload Middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // ⏫ Increased limit: 10MB
});

const fileToHex = (buffer) => {
  return buffer.toString('hex');
};

module.exports = { upload, fileToHex, cloudinary };
