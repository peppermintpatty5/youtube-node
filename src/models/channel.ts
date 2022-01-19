import { DataTypes, Model, Sequelize } from "sequelize";

export class Channel extends Model {
  public id!: string;

  public name!: string | null;
}

export function channelInit(sequelize: Sequelize) {
  return Channel.init(
    {
      id: { type: DataTypes.CHAR(24), primaryKey: true },
      name: DataTypes.STRING(255),
    },
    { sequelize }
  );
}
