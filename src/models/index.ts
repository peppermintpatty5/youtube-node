import type { Sequelize } from "sequelize";

import Channel from "./channel";
import Video from "./video";

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
