const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true
    }
  },
  ranking: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Tag;
