import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/database.sqlite',
});

// Interface capa presentacion
export interface ITask {
  id: number;
  userId: number;
  title: string;
  description: string;
  pending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskWithDataValues extends ITask {
  dataValues: ITask
}

export interface ITaskInsert extends ITaskUpdate {
  userId: number;
}

export interface ITaskUpdate {
  title: string;
  description: string;
  pending: boolean;
}

// class capa negocio
export class Task extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public pending!: number; // 1 true, 0 false
  public createdAt!: Date;
  public updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,      
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pending: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Task',
  }
);


