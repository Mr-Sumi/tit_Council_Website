const express = require("express");
const path = require("path");
const connectdb = require("./config/db");
const authRouter = require("./routes/auth.route.js");
const session = require("express-session");
const payment = require("./routes/payment.route.js");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./middleware/isLoggedIn");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const cron = require('node-cron');
let club = require("./routes/club.route.js");
let event = require("./routes/event.route.js");

require("dotenv").config();
connectdb();

const app = express();
let PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/club", club);
app.use("/event", event);
app.use("/payment", payment);

const fetchAllImages = require('./routes/fetchAllImages');

// Run once every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('📸 Fetching updated Cloudinary images...');
  fetchAllImages();
});

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get("/", (req, res) => {
  req.cookies.token
    ? res.render("student council", { isLoggedIn: true })
    : res.render("student council", { isLoggedIn: false });
});

// Member routes
app.get("/members", (req, res) => {
  res.render("OurTeam", { title: "Member Page" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});
// Faculty route
app.get("/faculty", (req, res) => {
  res.render("FaculityPage", { title: "Faculty Page" });
});

// Clubs route
app.get("/clubs", (req, res) => {
  res.render("Ourclubs", { title: "Clubs Page" });
});

// Gallery route
app.get("/gallery", (req, res) => {
  res.render("Gallery", { title: "Gallery Page" });
});

app.get("/Dev", (req, res) => {
  res.render("Dev team", { title: "Developer Page" });
});

// Form route
app.get("/form", (req, res) => {
  res.render("form", { title: "Form Page" });
});

app.get("/eventPage", (req, res) => {
  res.render("Events", { isLoggedIn: true });
});

app.get("/userPage", isLoggedIn, async (req, res) => {
  const { enrollment, username, email, phone } = jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET
  );
  res.render("user", { enrollment, username, email, phone });
});

app.get("/error", (req, res) => {
  res.render("error", { title: "error:404" });
});


app.use((req, res, next) => {
  res.status(404).render("error", { title: "Page Not Found" });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth')
const { getFirestore } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyAog8nhlq4v8KxrJiQhn19DT_eWcbsh5yw",
  authDomain: "student-council-f7f41.firebaseapp.com",
  projectId: "student-council-f7f41",
  storageBucket: "student-council-f7f41.appspot.com",
  messagingSenderId: "18454546490",
  appId: "1:18454546490:web:09ac0b75dcd5ecb5b80d03",
  measurementId: "G-FXCS20QKHE"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

module.exports = { auth, db }
