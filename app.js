const express = require('express');
const path = require('path');
const connectdb = require('./config/db'); 
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const user = require('./models/usermodels');
const authRouter = require("./routes/auth");
const session=require('express-session');
const localStrategy = require('passport-local').Strategy;
const Payment = require('./models/payment.js');
const bodyParser = require('body-parser'); 
const cookieParser = require("cookie-parser");
const usermodels = require('./models/usermodels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("./middleware/isLoggedIn");
let club=require('./routes/Club.js');
let event=require('./routes/Event.js')

require('dotenv').config();
connectdb();

const app = express();
 let PORT=process.env.PORT ||4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,   
  resave: false,             
  saveUninitialized: false,  
}));


app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/club",club)
app.use("/event",event)



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,   
  key_secret: process.env.RAZORPAY_KEY_SECRET  
});

app.post('/create/orderId', async (req, res) => {
  const options = {
    amount: 5000 * 100, 
    currency: "INR",
  };

  try {
    const order = await razorpay.orders.create(options); 
    res.send(order);

    await Payment.create({
      orderId: order.id,
      amount: order.amount / 100, 
      currency: order.currency,
      status: 'pending',
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating order');
  }
});


app.post('/api/payment/verify', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const crypto = require('crypto');

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (generatedSignature === signature) {
    await Payment.findOneAndUpdate(
      { orderId: razorpayOrderId },
      { paymentId: razorpayPaymentId, signature, status: 'completed' }
    );
    res.send('Payment verified successfully');
  } else {
    res.status(400).send('Payment verification failed');
  }
});

app.post('/current_user', (req, res) => {
  if (currentUser) {
    res.json({ loggedIn: true, username: currentUser.username });
  } else {
    res.json({ loggedIn: false });
  }
});

// Home route
app.get('/', (req, res) => {
  res.render('student council', { isLoggedIn : true });
});

// Member routes
app.get('/members', (req, res) => {
  res.render('OurTeam', { title: 'Member Page' });
});

app.get('/login',(req, res) => {
  res.render('login', { title: 'Login Page' });
})
// Faculty route
app.get('/faculty',  (req, res) => {
  res.render('FaculityPage', { title: 'Faculty Page' });
});

// Clubs route
app.get('/clubs', (req, res) => {
  res.render('Ourclubs', { title: 'Clubs Page' });
});

// Gallery route
app.get('/gallery', (req, res) => {
  res.render('Gallery', { title: 'Gallery Page' });
});


app.get('/Dev',  (req, res) => {
  res.render('Dev team', { title: 'Developer Page' });
});

// Form route
app.get('/form',isLoggedIn, (req, res) => {
  res.render('form', { title: 'Form Page' });
});


app.get("/eventPage",isLoggedIn,(req,res)=>{
  res.render("Events",{isLoggedIn:true});
})

app.get("/userPage",isLoggedIn,(req,res)=>{
  res.render("user");
})


<<<<<<< HEAD
app.get('/error', (req, res) => {
  res.render('error', { title: 'error:404' });
});

app.use((req, res, next) => {
  res.status(404).render('error', { title: 'Page Not Found' });
  next();
});


=======

>>>>>>> e55b385a8b5927894a7ff0a9bf8732bcfcd01757
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});