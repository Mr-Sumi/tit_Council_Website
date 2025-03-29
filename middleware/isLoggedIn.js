const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = (req, res, next) => {
    try {
      if (!req.cookies.token || req.cookies.token === "") {
        return res.redirect("/login");
      }
      const data = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
      req.user = data;
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      return res.redirect("/login");
    }
  };