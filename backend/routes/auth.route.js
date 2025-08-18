const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../models/user.model");
const isLoggedIn = require("../middleware/isLoggedIn");


router.post("/register", async (req, res) => {
  try {
    const { username,enrollment ,email,dob, phone } = req.body;
    const dob1 = dob.split('-').reverse().join('');

    if (!username || !email || !enrollment || !dob || !phone) {
      req.flash('error_msg', 'All fields are required');
      return res.redirect('/login');
    }

    let user = await userModel.findOne({ enrollment: enrollment });

    if (user) {
      req.flash('error_msg', 'User already exists. Please login');
      return res.redirect('/login');
    }

    bcrypt.genSalt(11, function (err, salt) {
      bcrypt.hash(dob1, salt, async function (err, hash) {
        const createdUser = await userModel.create({
          username,
          enrollment,
          email,
          dob: hash,
          phone,
        });

        const token = jwt.sign(
          {username, enrollment, email, phone },
          process.env.JWT_SECRET
        );

        res.cookie("token", token);
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect("/");
      });
    });
  } catch (err) {
    req.flash('error_msg', err.message);
    res.redirect('/login');
  }
});

router.post("/login", async (req, res) => {
  try {
    const { enrollmentno, dob } = req.body;

    if (!enrollmentno || !dob) {
      req.flash('error_msg', 'Email and password are required');
      return res.redirect('/login');
    }

    let user = await userModel.findOne({ enrollment: enrollmentno }).select("+password");
    if (!user) {
      req.flash('error_msg', 'Please register first');
      return res.redirect('/login');
    } 


    const result = await bcrypt.compare(dob, user.dob);
      if (!result) {
        req.flash('error_msg', 'Email or password did not match');
        return res.redirect('/login');
      }
      let { username, enrollment, email, phone } = user;
      let token = jwt.sign({username,enrollment,email,phone}, process.env.JWT_SECRET);
      res.cookie("token", token);
      req.flash('success_msg', 'You are now logged in');
      res.redirect("/");
    ;
  } catch (err) {
    req.flash('error_msg', err.message);
    res.redirect('/login');
  }
});

router.get("/logout", (req, res) => {
  res.cookie('token', "");
  req.flash('success_msg', 'You are now logged out');
  res.redirect("/login");
});


router.post("/user", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email }).select("-dob -__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate JWT token
    const { username, enrollment, phone } = user;
    const token = jwt.sign(
      { username, enrollment, email, phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // optional expiry
    );

    // Send cookie + response
    res.cookie("token", token, {
      httpOnly: true,  // prevent JS access
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict"
    });

    res.json({ username, enrollment, email, phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;