const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../models/user.model");
const isLoggedIn = require("../middleware/isLoggedIn");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


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
  try {
    // Clear the JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "You are now logged out",
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
});



router.get("/auth-check", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-dob"); // exclude hashed dob
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (err) {
    console.error("Auth check error:", err.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});




module.exports = router;