/* eslint-disable @typescript-eslint/lines-between-class-members */
import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import type Video from "./video";

type ChannelAssociations = "videos";

export default class Channel extends Model<
  InferAttributes<Channel, { omit: ChannelAssociations }>,
  InferCreationAttributes<Channel, { omit: ChannelAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Channel hasMany Video
  declare videos?: NonAttribute<Video[]>;
  declare getVideos: HasManyGetAssociationsMixin<Video>;
  declare setVideos: HasManySetAssociationsMixin<Video, string>;
  declare addVideo: HasManyAddAssociationMixin<Video, string>;
  declare addVideos: HasManyAddAssociationsMixin<Video, string>;
  declare createVideo: HasManyCreateAssociationMixin<Video>;
  declare removeVideo: HasManyRemoveAssociationMixin<Video, string>;
  declare removeVideos: HasManyRemoveAssociationsMixin<Video, string>;
  declare hasVideo: HasManyHasAssociationMixin<Video, string>;
  declare hasVideos: HasManyHasAssociationsMixin<Video, string>;
  declare countVideos: HasManyCountAssociationsMixin;

  declare static associations: {
    videos: Association<Channel, Video>;
  };

  static initModel(sequelize: Sequelize): typeof Channel {
    Channel.init(
      {
        id: {
          type: DataTypes.STRING(24),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(30),
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
      }
    );

    return Channel;
  }
}
