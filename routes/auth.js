const express = require("express");
const app = express.Router();
const passport = require("passport");
const usermodels = require('../models/usermodels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const flash = require("connect-flash");


app.post("/register", async(req, res) => {
  let { username, enrollment, email, dob, phone} = req.body;
 // console.log(username, enrollment, email, dob, phone);
  const user = await usermodels.findOne({ enrollment, email ,phone });
  if (user) {
    req.flash("error", "User already exists");
    return res.redirect("/login");  // Use flash on redirect
  }else{
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
          });
          let token = jwt.sign({ username, enrollment, dob }, process.env.JWT_TOKEN);
          res.cookie("token", token, { httpOnly: true, secure: true });
          req.flash("success", "Registration successful");
          res.redirect("/login");
        } catch (err) {
          req.flash("error", "Error creating user");
          res.redirect("/register");
        }
      });
    });
  }
});

// login User
app.post("/login", async (req, res) => {
  try {
    const { enrollment, dob } = req.body;
    const user = await usermodels.findOne({ enrollment });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }
    const isPasswordValid = await bcrypt.compare(dob, user.dob);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }
    const token = jwt.sign(
      { enrollment: user.enrollment, dob: user.dob },
      process.env.JWT_TOKEN, 
      { expiresIn: "6h" }
    );
    res.cookie("token", token, { httpOnly: true });
    req.flash("success", "Login successful");
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error.message);
    req.flash("error", "An error occurred during login");
    res.redirect("/login");
    // return res.status(500).send("An error occurred while processing your request");
  }
});

// Logout karne ke liye.
app.get("/logout",(req,res) => {
  res.cookie("token","");
  res.clearCookie("token");
  res.redirect("/");
})

module.exports = app;
