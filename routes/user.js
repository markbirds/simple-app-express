const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.render("users", { users });
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render("profile", { user, editable: false });
});

// router.post("/", (req, res) => {
//   const isValid = false
//   if (isValid) {
//     users.push({ firstName: req.body.firstName })
//     res.redirect(`/users/${users.length - 1}`)
//   } else {
//     console.log("Error")
//     res.render("users/new", { firstName: req.body.firstName })
//   }
// })

// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log(req.user)
//     res.send(`Get User With ID ${req.params.id}`)
//   })
//   .put((req, res) => {
//     res.send(`Update User With ID ${req.params.id}`)
//   })
//   .delete((req, res) => {
//     res.send(`Delete User With ID ${req.params.id}`)
//   })

module.exports = router;
