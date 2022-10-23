const express = require("express");
const router = express.Router();

const checkSession = require("../middlewares/check-session");

const User = require("../models/user");

async function getUserByPk(id) {
  return await User.findByPk(id).then(function (user) {
    return user.toJSON();
  });
}

router.get("/", checkSession, async (req, res) => {
  // render user profile page
  const user = await getUserByPk(req.session.userId);

  res.render("profile", { user, editable: true });
});

router.patch("/update", checkSession, async (req, res) => {
  const userId = req.session.userId;

  // update user data
  await User.update(req.body, {
    where: {
      id: userId,
    },
  });

  // query updated user data
  const updated_user = await getUserByPk(userId);
  res.json({ message: "User successfully updated", data: updated_user });
});

router.get("/users", async (req, res) => {
  // fetch all users
  const users = await User.findAll();

  res.render("users", { users });
});

router
  .route("/users/:id")
  .get(async (req, res) => {
    const user = await getUserByPk(req.params.id);

    res.render("profile", { user, editable: false });
  })
  .delete(checkSession, async (req, res) => {
    // remove userId in session
    delete req.session.userId;

    // delete user
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "User successfully deleted" });
  });

module.exports = router;
