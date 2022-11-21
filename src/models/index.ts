import type { Sequelize } from "sequelize";
import Video from "./video";
import Channel from "./channel";

export { Video, Channel };

export function initModels(sequelize: Sequelize) {
  Video.initModel(sequelize);
  Channel.initModel(sequelize);

  Video.belongsTo(Channel, {
    as: "channel",
    foreignKey: { name: "channel_id", allowNull: false },
  });
  Channel.hasMany(Video, {
    as: "videos",
    foreignKey: { name: "channel_id", allowNull: false },
  });

  return {
    Video,
    Channel,
  };
}
