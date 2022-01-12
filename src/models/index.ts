import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import video from "./video";

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

export default sequelize;
