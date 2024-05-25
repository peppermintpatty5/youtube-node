/* eslint-disable @typescript-eslint/lines-between-class-members */

import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import type Channel from "./channel";

type VideoAssociations = "channel";

export default class Video extends Model<
  InferAttributes<Video, { omit: VideoAssociations }>,
  InferCreationAttributes<Video, { omit: VideoAssociations }>
> {
  declare id: string;
  declare title: string | null;
  declare description: string | null;
  declare uploadDate: string | null;
  declare duration: number | null;
  declare viewCount: number | null;
  declare likeCount: number | null;
  declare dislikeCount: number | null;
  declare thumbnail: string | null;
  declare ext: string | null;
  declare localVideoPath: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Video belongsTo Channel
  declare channel?: NonAttribute<Channel>;
  declare getChannel: BelongsToGetAssociationMixin<Channel>;
  declare setChannel: BelongsToSetAssociationMixin<Channel, string>;
  declare createChannel: BelongsToCreateAssociationMixin<Channel>;

  declare static associations: {
    channel: Association<Video, Channel>;
  };

  static initModel(sequelize: Sequelize): typeof Video {
    Video.init(
      {
        id: {
          type: DataTypes.STRING(11),
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(100),
        },
        description: {
          type: DataTypes.STRING(5000),
        },
        uploadDate: {
          type: DataTypes.DATEONLY,
        },
        duration: {
          type: DataTypes.INTEGER,
        },
        viewCount: {
          type: DataTypes.INTEGER,
        },
        likeCount: {
          type: DataTypes.INTEGER,
        },
        dislikeCount: {
          type: DataTypes.INTEGER,
        },
        thumbnail: {
          type: DataTypes.STRING(255),
        },
        ext: {
          type: DataTypes.STRING(4),
        },
        localVideoPath: {
          type: DataTypes.STRING(255),
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      },
    );

    return Video;
  }
}
