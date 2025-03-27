const express = require('express');
const path = require('path');
const connectdb = require('./config/db');  // Using CommonJS `require`
// const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const user = require('./models/usermodels');
const authRouter = require("./routes/auth");
const passport = require('passport');
const plm=require('passport-local-mongoose');
const session=require('express-session');
const localStrategy = require('passport-local').Strategy;
const Payment = require('./models/payment.js');
const bodyParser = require('body-parser'); 
const cors = require('cors');
passport.use(new localStrategy(user.authenticate()));
const cookieParser = require("cookie-parser");
const usermodels = require('./models/usermodels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(cors());  

require("./config/google_oauth_config");
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

  // Verify if the generated signature matches the Razorpay signature
  if (generatedSignature === signature) {
    // Update payment status in the database
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


app.post("/register", (req, res) => {
  let { username, enrollment, email, dob, phone} = req.body;
 // console.log(username, enrollment, email, dob, phone);

  bcrypt.genSalt(11, (err, salt) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error generating salt");
    }
    bcrypt.hash(dob, salt, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error hashing password");
      }
      try {
        let user = await usermodels.create({
          username,
          enrollment,
          email,
          dob: hash,
          phone,
          // password: hash,
        });
        let token = jwt.sign({ username, enrollment, dob }, process.env.JWT_TOKEN);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect("/");
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error creating user");
      }
    });
  });
});

// login User
app.post("/login", async (req, res) => {
  try {
    const { enrollment, dob } = req.body;
    const user = await usermodels.findOne({ enrollment });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(dob, user.dob);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { enrollment: user.enrollment, dob: user.dob },
      process.env.JWT_TOKEN, 
      { expiresIn: "6h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("An error occurred while processing your request");
  }
});


// Middleware done.
const isLoggedIn = (req, res, next) => {
  try {
    if (!req.cookies.token || req.cookies.token === "") {
      return res.redirect("/login");
    }
    const data = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
    req.user = data;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.redirect("/login");
  }
};

// Logout karne ke liye.
app.get("/logout",(req,res) => {
  res.cookie("token","");
  res.clearCookie("token");
  res.redirect("/");
})





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

// Coding Club route


// Developer route
app.get('/Dev',  (req, res) => {
  res.render('Dev team', { title: 'Developer Page' });
});

// Form route
app.get('/form',isLoggedIn, (req, res) => {
  res.render('form', { title: 'Form Page' });
});

// Event details route 


app.get('/payment', (req, res) => {
  res.render('payment', { title: 'PaymentPage' });{ title: 'Payment Page' };
});

app.get("/eventPage",isLoggedIn,(req,res)=>{
  res.render("Events",{isLoggedIn:true});
})

app.get("/userPage",isLoggedIn,(req,res)=>{
  res.render("user");
})

  


// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});