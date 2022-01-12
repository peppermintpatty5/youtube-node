import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) =>
  sequelize.define("video", {
    id: { type: DataTypes.CHAR(11), primaryKey: true },
    title: `${DataTypes.STRING(100)} CHARACTER SET utf8mb4`,
    description: `${DataTypes.STRING(5000)} CHARACTER SET utf8mb4`,
    upload_date: DataTypes.DATE,
    channel_id: DataTypes.CHAR(24),
    duration: DataTypes.INTEGER,
    view_count: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING(255),
    ext: DataTypes.CHAR(4),
  });
