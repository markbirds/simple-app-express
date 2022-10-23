const { Sequelize } = require("sequelize");

// Database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite3",
});

module.exports = sequelize;
