const express = require("express");
const router = express.Router();

const User = require("../models/user");

router
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    await User.create(req.body);

    res.redirect("/auth/login");
  });

module.exports = router;
