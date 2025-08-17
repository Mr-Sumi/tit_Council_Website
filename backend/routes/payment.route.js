require('dotenv').config();
let express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const crypto = require('crypto');
const Registration = require('../models/payment.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure multer storage
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

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Price calculation function (matches the client-side function)
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

// Create order ID endpoint - Modified to match the client-side implementation
router.post('/create/orderId', async (req, res) => {
  try {
    const { amount, event, participantType, college } = req.body;
    // console.log(req.body);
    
    // Validate the required da
    if (!event || !participantType || !college) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Calculate price on server side to ensure accuracy
    const calculatedAmount = calculatePrice(event, participantType) * 100; // Convert to paise
    
    // Validate amount matches expected amount
    if (amount && calculatedAmount !== parseFloat(amount)) {
      console.warn(`Client sent amount ${amount} but server calculated ${calculatedAmount}`);
      // Continue with the server-calculated amount for security
    }
    
    const options = {
      amount: calculatedAmount,
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    };
    
    const order = await razorpay.orders.create(options);
    
    // Store order data in session for later verification
    req.session.orderData = {
      orderId: order.id,
      amount: calculatedAmount,
      event,
      participantType,
      college
    };
    
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});


// Payment verification endpoint
router.post('/api/payment/verify', async (req, res) => {
  try {
    let { 
      razorpayOrderId, 
      razorpayPaymentId, 
      signature, 
      event, 
      participantType,
      amount 
    } = req.body;

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

  if (generatedSignature !== signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }  
  
    // Check if order data exists in session
    if (req.session.orderData && req.session.orderData.orderId === razorpayOrderId) {
      // Order data found in session
      const orderData = req.session.orderData;
      
      req.session.verifiedPayment = {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        amount: orderData.amount / 100,
        event: orderData.event,
        participantType: orderData.participantType,
        college: orderData.college,
        verifiedAt: new Date()
      };
      
      res.json({ 
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      // If order data not in session, verify with the data sent from client
      if (!event || !participantType) {
        return res.status(400).json({ error: 'Missing event information' });
      }
      
      req.session.verifiedPayment = {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        amount: amount || calculatePrice(event, participantType),
        event,
        participantType,
        verifiedAt: new Date()
      };
      
      res.json({ 
        success: true,
        message: 'Payment verified successfully'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});

module.exports = router;
