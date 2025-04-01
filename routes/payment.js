
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Registration = require('../models/payment'); // Assuming you have a Registration model
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads/participants';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg files are allowed!'));
    }
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

function calculatePrice(eventName, participantType) {
  eventName = eventName.toUpperCase();
  participantType = participantType.toUpperCase();
  
  let price = 0;
  
  // Robo events
  if (eventName === "ROBO RACE" || eventName === "ROBO WAR") {
    price = 300;
  }
  // Hackathon
  else if (eventName === "HACKATHON") {
    price = 200;
  }
  // Code events
  else if (eventName === "CODE CLASH 4.0") {
    price = 75;
  }
  // Gaming events
  else if ((eventName === "FREE FIRE" || eventName === "BGMI")) {
    if (participantType === "SOLO") {
      price = 50;
    } else if (participantType === "SQUAD-4-MEMBER") {
      price = 200;
    }
  }
  // Musical chair
  else if (eventName === "MUSICAL CHAIR") {
    price = 20;
  }
  // Renewable model showcase
  else if (eventName === "RENEWABLE MODEL SHOWCASE") {
    price = 50;
  }
  // Performance events
  else if ((eventName === "DUMB CHARADES" || eventName === "MIC DROP")) {
    if (participantType === "SOLO") {
      price = 20;
    } else if (participantType === "DUO") {
      price = 40;
    } else if (participantType === "TRIO") {
      price = 60;
    } else if (participantType === "SQUAD-4-MEMBER") {
      price = 80;
    }
  }
  // Corporate challenge
  else if (eventName === "CORPORATE CHALLENGE SHOWDOWN") {
    if (participantType === "SOLO") {
      price = 100;
    } else {
      price = 200;
    }
  }
  // Entrepreneurship stall
  else if (eventName === "ENTREPRENEURSHIP STALL") {
    if (participantType === "SOLO") {
      price = 50;
    } else {
      price = 200;
    }
  }
  // Technical presentation
  else if (eventName === "TECHNICAL PRESENTATION") {
    if (participantType === "DUO") {
      price = 50;
    } else {
      price = 30;
    }
  }
  // Dance events
  else if (eventName === "FLASH MOB") {
    if (participantType === "SOLO") {
      price = 50;
    } else if (participantType === "DUO") {
      price = 100;
    } else if (participantType === "SQUAD-4-MEMBER") {
      price = 150;
    }
  }
  // Art events
  else if (eventName === "ART-BYTE" || eventName === "PIXEL PERFECT") {
    price = 30;
  }
  // Quiz events
  else if (eventName === "BUZZ QUEST" || eventName === "BATTLE OF WITZ") {
    price = 20;
  }
  // Treasure hunt
  else if (eventName === "TREASURE HUNT") {
    price = 200;
  }
  // Other events (default)
  else {
    price = 50; // Default price
  }
  
  return price;
}

router.post('/create/orderId', upload.fields([
  { name: 'soloPhoto', maxCount: 1 },
  { name: 'leaderPhoto', maxCount: 1 },
  { name: 'member1Photo', maxCount: 1 },
  { name: 'member2Photo', maxCount: 1 },
  { name: 'member3Photo', maxCount: 1 },
  { name: 'member4Photo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { 
      events, 
      number, 
      college,
      soloName, soloEnrollment, soloEmail,
      leaderName, leaderEnrollment, leaderEmail,
      member1Name, member1Enrollment, member1Email,
      member2Name, member2Enrollment, member2Email,
      member3Name, member3Enrollment, member3Email,
      member4Name, member4Enrollment, member4Email
    } = req.body;
    
    const amount = calculatePrice(events, number) * 100;
    
    const options = {
      amount,
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    };
    
    const order = await razorpay.orders.create(options);
    
    const files = req.files || {};
    
    req.session.orderData = {
      orderId: order.id,
      amount,
      events,
      number,
      college,
      participants: []
    };
    
    if (number.toLowerCase() === 'solo') {
      req.session.orderData.participants.push({
        name: soloName,
        enrollment: soloEnrollment,
        email: soloEmail,
        photo: files.soloPhoto ? files.soloPhoto[0].path : null
      });
    } else {
      req.session.orderData.participants.push({
        name: leaderName,
        enrollment: leaderEnrollment,
        email: leaderEmail,
        role: 'leader',
        photo: files.leaderPhoto ? files.leaderPhoto[0].path : null
      });
      
      if (member1Name) {
        req.session.orderData.participants.push({
          name: member1Name,
          enrollment: member1Enrollment,
          email: member1Email,
          role: 'member',
          photo: files.member1Photo ? files.member1Photo[0].path : null
        });
      }
      
      if (member2Name) {
        req.session.orderData.participants.push({
          name: member2Name,
          enrollment: member2Enrollment,
          email: member2Email,
          role: 'member',
          photo: files.member2Photo ? files.member2Photo[0].path : null
        });
      }
      
      if (member3Name) {
        req.session.orderData.participants.push({
          name: member3Name,
          enrollment: member3Enrollment,
          email: member3Email,
          role: 'member',
          photo: files.member3Photo ? files.member3Photo[0].path : null
        });
      }
      
      if (member4Name) {
        req.session.orderData.participants.push({
          name: member4Name,
          enrollment: member4Enrollment,
          email: member4Email,
          role: 'member',
          photo: files.member4Photo ? files.member4Photo[0].path : null
        });
      }
    }
    
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});

// Payment verification endpoint
router.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    
    const orderData = req.session.orderData;
    
    if (!orderData || orderData.orderId !== razorpayOrderId) {
      return res.status(400).json({ error: 'Invalid order' });
    }
    
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');
    
    if (generatedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

  module.exports =app;
    
    const registration = new Registration({
      eventName: orderData.events,
      participantType: orderData.number,
      college: orderData.college,
      participants: orderData.participants,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      amount: orderData.amount / 100,
      paymentDate: new Date()
    });
    
    await registration.save();
    
    delete req.session.orderData;
    
    res.json({ 
      success: true,
      message: 'Payment verified successfully',
      registrationId: registration._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});

router.get('/registration/success', (req, res) => {
  res.render('registration-success'); // Create this view to show success message
});

module.exports = router;
