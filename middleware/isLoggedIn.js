require('dotenv').config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodels");
const JWT_SECRET = process.env.JWT_SECRET;

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error_msg", "You must be logged in to access this page.");
    console.log("Token not found in cookies.");
    return res.redirect("/login");
  }
  try {
    console.log(JWT_SECRET);
    const decoded = jwt.verify(token,JWT_SECRET);
    const user = await userModel.findById(decoded.enrollment);
    if (!user) {
      req.flash("error_msg", "Invalid token. Please log in again.");
      console.log("User not found for the given token.");
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    req.flash("error_msg", "Invalid token. Please log in again.");
    console.log("Token verification failed:", err.message);
    return res.redirect("/login");
  }
};

module.exports = { isLoggedIn };