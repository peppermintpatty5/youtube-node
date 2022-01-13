import { DataTypes, Model, Sequelize } from "sequelize";

export class Video extends Model {
  public id!: string;

  public title!: string | null;

  public description!: string | null;

  public upload_date!: Date | null;

  public channel_id!: string | null;

  public duration!: number | null;

  public view_count!: number | null;

  public thumbnail!: string | null;

  public ext!: string | null;
}

export function videoInit(sequelize: Sequelize) {
  return Video.init(
    {
      id: { type: DataTypes.CHAR(11), primaryKey: true },
      title: `${DataTypes.STRING(100)} CHARACTER SET utf8mb4`,
      description: `${DataTypes.STRING(5000)} CHARACTER SET utf8mb4`,
      upload_date: DataTypes.DATE,
      channel_id: DataTypes.CHAR(24),
      duration: DataTypes.INTEGER,
      view_count: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING(255),
      ext: DataTypes.CHAR(4),
    },
    { sequelize }
  );
}
