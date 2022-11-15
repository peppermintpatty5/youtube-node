import type { Sequelize } from "sequelize";
import Video from "./video";
import Channel from "./channel";

export { Video, Channel };

export function initModels(sequelize: Sequelize) {
  Video.initModel(sequelize);
  Channel.initModel(sequelize);

  Video.belongsTo(Channel, { foreignKey: { allowNull: false } });
  Channel.hasMany(Video);

  return {
    Video,
    Channel,
  };
}
