import type { Sequelize } from "sequelize";
import Video from "./video";
import Channel from "./channel";

export { Video, Channel };

export function initModels(sequelize: Sequelize) {
  Video.initModel(sequelize);
  Channel.initModel(sequelize);

  Video.belongsTo(Channel, {
    as: "channel",
    foreignKey: "channel_id",
  });
  Channel.hasMany(Video, {
    as: "videos",
    foreignKey: "channel_id",
  });

  return {
    Video,
    Channel,
  };
}
