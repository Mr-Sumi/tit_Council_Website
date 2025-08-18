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
  console.log("Login attempt:", req.body);
  try {
    let enrollmentno = req.body.collegeId;
    let dob = req.body.password;


    // Validate input
    if (!enrollmentno || !dob) {
      return res.status(400).json({
        success: false,
        message: "Enrollment number and DOB are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ enrollment: enrollmentno });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    // Compare hashed DOB
    const dobPlain = dob.split("-").reverse().join(""); // convert format if needed
    const result = await bcrypt.compare(dobPlain, user.dob);
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const { username, enrollment, email, phone } = user;
    const token = jwt.sign(
      { id: user._id, username, enrollment, email, phone },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, username, enrollment, email, phone },
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-dob"); // dob remove
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



module.exports = router;