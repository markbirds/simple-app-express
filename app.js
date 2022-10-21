const express = require("express");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const registerRouter = require("./routes/register");

const sequelize = require("./db/connect");
const User = require("./models/user");

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// template engine
app.set("view engine", "ejs");

// routes
app.use(userRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);

// handle 404 routes
app.use(function (req, res) {
  res.redirect("/auth/login");
});

const run = async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(5000);
  } catch (error) {
    console.log(error);
  }
};

run();
