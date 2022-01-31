import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { Video, videoInit } from "./video";

// connect to database
dotenv.config();
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  dialect: "mysql",
  define: {
    charset: "ascii",
    collate: "ascii_bin",
  },
  logging: false,
});

// initialize model definitions
videoInit(sequelize);

export default sequelize;
export { Video };
