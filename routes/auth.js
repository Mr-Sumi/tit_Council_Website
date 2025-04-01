const express = require("express");
const app = express.Router();
const passport = require("passport");
const usermodels = require('../models/usermodels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const flash = require("connect-flash");

// Registration route
app.post("/register", async(req, res) => {
  try {
    let { username, enrollment, email, dob, phone } = req.body;
    
    // Input validation
    if (!username || !enrollment || !email || !dob || !phone) {
      req.flash("error", "All fields are required");
      return res.redirect("/login");
    }

    // Check if user exists
    const existingUser = await usermodels.findOne({
      $or: [
        { enrollment: enrollment },
        { email: email },
        { phone: phone }
      ]
    });

    if (existingUser) {
      req.flash("error", "Account already exists with these credentials");
      return res.redirect("/login");
    }

    // Create new user
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(dob, salt);
    
    const newUser = await usermodels.create({
      username,
      enrollment,
      email,
      dob: hash,
      phone,
    });

    const token = jwt.sign(
      { username, enrollment },
      process.env.JWT_TOKEN,
      { expiresIn: '6h' }
    );

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    req.flash("success", "Registration successful! Please login.");
    res.redirect("/login");

  } catch (error) {
    console.error("Registration error:", error);
    req.flash("error", "Registration failed. Please try again.");
    res.redirect("/login");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { enrollment, dob } = req.body;

    // Input validation
    if (!enrollment || !dob) {
      req.flash("error", "Please provide both enrollment and date of birth");
      return res.redirect("/login");
    }

    // Find user
    const user = await usermodels.findOne({ enrollment });
    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dob, user.dob);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    // Generate token
    const token = jwt.sign(
      { enrollment: user.enrollment, username: user.username },
      process.env.JWT_TOKEN,
      { expiresIn: "6h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    req.flash("success", `Welcome back, ${user.username}!`);
    req.session.isLoggedIn = true;
    res.redirect("/");

  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/login");
  }
});

// Logout route
app.get("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    req.flash("success", "Successfully logged out");
   req.session.isLoggedIn = false;
    res.redirect("/login");
  } catch (error) {
    console.error("Logout error:", error);
    req.flash("error", "Logout failed");
    res.redirect("/");
  }
});

module.exports = app;
