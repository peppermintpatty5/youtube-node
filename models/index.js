const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

const video = require("./video");

// connect to database
dotenv.config();
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "mysql",
  define: {
    charset: "ascii",
    collate: "ascii_bin",
  },
});

// initialize model definitions
const modelDefines = [video];
modelDefines.forEach((model) => model(sequelize));

module.exports = { sequelize };
