const express = require("express");
const router = express.Router();

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    res.send("post");
  });

router.get("/new", (req, res) => {
  res.render("users/new");
});

module.exports = router;
