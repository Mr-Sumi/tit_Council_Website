const express = require('express');
const path = require('path');
const connectdb = require('./config/db');  // Using CommonJS `require`
const dotenv = require('dotenv');
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


dotenv.config();
connectdb();

const app = express();
const PORT =  4000;

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

// app.get('/current_user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ loggedIn: true, username: req.user.username });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });

// // Register Route
// app.post('/register', async (req, res) => {
//   try {
//     // Check if username, email, or phone already exists
//     const existingUser = await user.findOne({
//       $or: [{ username: req.body.username }, { email: req.body.email }, { phone: req.body.phone }]
//     });

//     if (existingUser) {
//       return res.status(400).send('Username, Email, or Phone number already exists.');
//     }

//     // Ensure that all required fields are provided
//     if (!req.body.dob || !req.body.phone) {
//       return res.status(400).send('Date of birth and phone number are required.');
//     }

//     // Create new user object with username, email, dob, and phone number
//     const newUser = new user({
//       username: req.body.username,
//       enrollment: req.body.enrollment,
//       email: req.body.email,
//       dob: req.body.dob,  // Ensure dob is included in the user object
//       phone: req.body.phone,
//       password: req.body.password,  
//         // Ensure phone number is included
//     });

//     // Register new user using passport-local-mongoose
//     user.register(newUser, req.body.password, (err, user) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send('Error while registering user');
//       }

//       // Authenticate the user after successful registration
//       passport.authenticate('local')(req, res, () => {
//         res.redirect('/'); // Redirect to home page or dashboard after successful login
//       });
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong.');
//   }
// });


// // Start the server
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


// Login route
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',  // Redirect to home page on success
//   failureRedirect: '/login',  // Redirect back to login page on failure
// }), (req, res) => {
//   // This function is intentionally empty because passport handles the redirect
// });

// // Logout route
// app.get('/logout', (req, res) => {
//   req.logout(() => {
//       res.redirect('/'); // Redirect to home or login page after logout
//   });
// });

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
app.get('/coding', (req, res) => {
  res.render('Coding club', { title: 'Coding Club Page' });
});

app.get('/Quiz ', (req, res) => {
  res.render('Anwesha Event/Technical Quiz ', { title: 'Quiz Page' });
})

// Drone Club route
app.get('/drone',  (req, res) => {
  res.render('drone club', { title: 'Drone Club Page' });
});

// Media Fusion route
app.get('/media', (req, res) => {
  res.render('mediafusion', { title: 'Media Fusion Page' });
});

// Cultural Club route
app.get('/Cultrul',  (req, res) => {
  res.render('Cultrul', { title: 'Cultural Club Page' });
});

// Robotics Club route
app.get('/Robotics',  (req, res) => {
  res.render('Robotics', { title: 'Robotics Club Page' });
});

// Entrepreneurship Club route
app.get('/entrepreneurship',  (req, res) => {
  res.render('entrepreneurship club', { title: 'Entrepreneurship Club Page' });
});

// Literary Club route
app.get('/Literary',  (req, res) => {
  res.render('Literary club', { title: 'Literary Club Page' });
});

// Renewable Energy route
app.get('/Renewable',  (req, res) => {
  res.render('Renewable energy', { title: 'Renewable Energy Page' });
});

// Discipline Club route
app.get('/Disipline',  (req, res) => {
  res.render('Disipline club', { title: 'Discipline Club Page' });
});

// Alumni Relation Club route
app.get('/Alimni',  (req, res) => {
  res.render('Alimni relation club', { title: 'Alumni Relation Club Page' });
});

// Tech Wizards route
app.get('/Tech',  (req, res) => {
  res.render('Tech wizards', { title: 'Tech Wizards Club Page' });
});

// EV Club route
app.get('/EV',  (req, res) => {
  res.render('EV', { title: 'EV Club Page' });
});

// Music Club route
app.get('/music',  (req, res) => {
  res.render('music', { title: 'Music Club Page' });
});

// Dance Club route
app.get('/Dance',  (req, res) => {
  res.render('Dance', { title: 'Dance Club Page' });
});

// IEEE Student Chapter route
app.get('/IEEE',  (req, res) => {
  res.render('IEEE Student chapter', { title: 'IEEE Student Chapter Page' });
});

// Developer route
app.get('/Dev',  (req, res) => {
  res.render('Dev team', { title: 'Developer Page' });
});

// Form route
app.get('/form',isLoggedIn, (req, res) => {
  res.render('form', { title: 'Form Page' });
});

// Event details route 
app.get('/event',  (req, res) => {
  res.render('Anwesha Event/Carnival', { title: 'Event Page' });
});

// Event details route
app.get('/eventcoding',  (req, res) => {
  res.render('Anwesha Event/codeclash', { title: 'Event Page' });
});

// Event details dance route

app.get('/eventdance',  (req, res) => {
  res.render('Anwesha Event/flash clash', { title: 'Event Page' });
});

// Event details renewable route

// Blog route (placeholder)
app.get('/blog',  (req, res) => {
  res.send('Blog page coming soon!');
});

app.get('/hackthon',  (req, res) => {
  res.render('Anwesha Event/UIovate(Hackthon)', { title: 'Hackthon Page' });
});

// musical chair route
app.get('/chair',  (req, res) => {
  res.render('Anwesha Event/Musical Chair', { title: 'Musical Chair Page' });
});

app.get('/race',  (req, res) => {
  res.render('Anwesha Event/roborace', { title: 'race Page' });
});

app.get('/war',  (req, res) => {
  res.render('Anwesha Event/robowar', { title: 'war Page' });
});

app.get('/presentation',  (req, res) => {
  res.render('Anwesha Event/technical presentation', { title: 'Presentation Page' });
})

//Anwesha Event/Renewable Model Showcase.ejs route

app.get('/modelshowcase',  (req, res) => {
  res.render('Anwesha Event/Renewable Model Showcase', { title: 'Model Showcase Page' });
});

app.get('/TEASERQUEST',  (req, res) => {
  res.render('Anwesha Event/TEASERQUEST', { title: 'TEASERQUEST Page' });
})


// Dumb Charades route

app.get('/dumb', (req, res) => {
  res.render('Anwesha Event/Dumb Charades', { title: 'Dumb Charades Page' });
});

// open mic route

app.get('/mic',  (req, res) => {
  res.render('Anwesha Event/Open Mic ', { title: 'Open Mic Page' });
});

//corporte event route

app.get('/corporate',  (req, res) => {
  res.render('Anwesha Event/CORPORATE CHALLENGE SHOWDOWN', { title: 'Corporate Event Page' });
});

//stall route

app.get('/stall',  (req, res) => {
  res.render('Anwesha Event/ENTERPRENEURSHIP SALES STALL', { title: 'Stall Page' });
});

// Escape Room Business Crisis route

app.get('/escape', (req, res) => {
  res.render('Anwesha Event/Escape Room Business Crisis', { title: 'Escape Room Business Crisis Page' });
});

// running route

app.get('/running',  (req, res) => {
  res.render('Anwesha Event/Marathon', { title: 'Running Page' });
});

app.get('/tug',  (req, res) => {
  res.render('Anwesha Event/Tug of War', { title: 'Tug of War Page' });
});

//bgmi routes

app.get('/bgmi',  (req, res) => {
  res.render('Anwesha Event/BGMI', { title: 'BGMI Page' });
});

// freefire route

app.get('/freefire',  (req, res) => {
  res.render('Anwesha Event/Free Fire', { title: 'Freefire Page' });
});

app.get('/payment', (req, res) => {
  res.render('payment', { title: 'PaymentPage' });{ title: 'Payment Page' };
});

app.get("/eventPage",(req,res)=>{
  res.render("Events");
})

  

// app.get('/error', (req, res) => {
//   res.render('error', { title: 'error:404' });
// });


// app.use((req, res, next) => {
//   res.status(404).render('error', { title: 'Page Not Found' });
// });


// app.post('/create/orderId', async (req, res) => {
//   const options = {
//     amount: `${200}` * 100, 
//     currency: "INR",
//   };
//   try {
//     const order = await razorpay.orders.create(options);
//     res.send(order);

//     await Payment.create({
//       orderId: order.id,
//       amount: order.amount/100,
//       currency: order.currency,
//       status: 'pending',
//     });
//   } catch (error) {
//     res.status(500).send('Error creating order');
//   }
// });

// app.post('/api/payment/verify', async (req, res) => {
//   const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
//   const crypto = require('crypto');
//   const generatedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//     .digest('hex');

//   if (generatedSignature === signature) {
//     await Payment.findOneAndUpdate(
//       { orderId: razorpayOrderId },
//       { paymentId: razorpayPaymentId, signature, status: 'completed' }
//     );
//     res.send('Payment verified successfully');
//   } else {
//     res.status(400).send('Payment verification failed');
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});