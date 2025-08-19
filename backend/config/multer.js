const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dfg8khkvb",
  api_key: "586298544495148",
  api_secret: "Rlli0u0ssTav1SdLgF7ydoravec",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads",
    format: file.mimetype === "application/pdf" ? "pdf" : undefined,
    public_id: `${file.originalname.split(".")[0]}-${Date.now()}`,
  }),
});

const upload = multer({ storage });

module.exports = { upload };
