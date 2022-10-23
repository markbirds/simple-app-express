const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../models/user");

router
  .route("/")
  .get((req, res) => {
    // render register page
    res.render("register");
  })
  .post(async (req, res) => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // hash password and save to database
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body);

    // redirect to login page
    res.redirect("/auth/login");
  });

module.exports = router;
