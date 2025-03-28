const express = require("express");
const app = express.Router();
const passport = require("passport");
const usermodels = require('../models/usermodels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



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



// Logout karne ke liye.
app.get("/logout",(req,res) => {
  res.cookie("token","");
  res.clearCookie("token");
  res.redirect("/");
})



module.exports = app;
