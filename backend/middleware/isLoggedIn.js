require('dotenv').config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error_msg", "You must be logged in to access this page.");
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    const user = await userModel.findOne({ enrollment: decoded.enrollment });
    if (!user) {
      req.flash("error_msg", "Invalid token. Please log in again.");
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    req.flash("error_msg", "Invalid token. Please log in again.");
    return res.redirect("/login");
  }
};

module.exports = { isLoggedIn };