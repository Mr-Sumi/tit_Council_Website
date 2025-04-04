require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fetchFromGallery = async () => {
  const images = [];
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      prefix: 'Gallery/', // Folder in Cloudinary
      max_results: 100,
    });

    result.resources.forEach(resource => {
      images.push(resource.secure_url);
    });

    fs.writeFileSync('imageLinks.json', JSON.stringify(images, null, 2));
    console.log(`✅ Updated imageLinks.json with ${images.length} images`);
  } catch (err) {
    console.error('❌ Error fetching images:', err.message);
  }
};

module.exports = fetchFromGallery;
