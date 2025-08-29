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
let council=require("./routes/councilRoutes.js");
let suggestion=require("./routes/suggestionRoutes.js")
let registration=require("./routes/registrationRoutes.js")
let cors=require("cors");


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
  cors({
    origin: ["https://studentcouncil.info", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    samesite:'none',
    maxAge: 1000 * 60 * 60 * 24,
    domain: '.studentcouncil.info' 
  }
}))

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
app.use("/council", council);
app.use("/suggestion", suggestion);
app.use("/registration", registration);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
