require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to fetch images
async function fetchAllImages() {
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 10000
    });

    const imageUrls = result.resources.map(r => r.secure_url);
    const filePath = path.join(__dirname, '..', 'public', 'imageLinks.json');
    fs.writeFileSync(filePath, JSON.stringify(imageUrls, null, 2));
    console.log(`✅ ${imageUrls.length} images written to imageLinks.json`);
  } catch (err) {
    console.error('❌ Cloudinary Fetch Error:', err.message);
  }
}

// ✅ THIS LINE IS IMPORTANT
module.exports = fetchAllImages;
