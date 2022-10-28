const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const User = require("../models/user");

router
  .route("/login")
  .get((req, res) => {
    if (req.session.userId) {
      return res.redirect("/");
    }

    // render login page
    res.render("login");
  })
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find email in database
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (user) {
      // if email and password are correct, redirect to user page
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user.id;
        return res.redirect("/");
      }
    }

    res.render("login", { error: "User not found" });
  });

router.get("/logout", (req, res) => {
  // remove user id in session and redirect to login page
  delete req.session.userId;

  res.redirect("/auth/login");
});

module.exports = router;
