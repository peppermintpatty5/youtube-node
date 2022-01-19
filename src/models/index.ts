import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { Channel, channelInit } from "./channel";
import { Video, videoInit } from "./video";

// connect to database
dotenv.config();
if (process.env.DB_URI === undefined) throw Error("DB_URI is undefined");
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "mysql",
  define: {
    charset: "ascii",
    collate: "ascii_bin",
  },
  logging: false,
});

// initialize model definitions
channelInit(sequelize);
videoInit(sequelize);

export default sequelize;
export { Channel, Video };
