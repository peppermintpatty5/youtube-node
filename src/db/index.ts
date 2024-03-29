import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const db: Sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    underscored: true,
  },
  logging: false,
});

export default db;
