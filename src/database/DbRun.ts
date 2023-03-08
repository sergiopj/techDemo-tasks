import { Logger } from '../services/Logger';
const logger = Logger.getLogger('DbRun');
import { Dialect, Sequelize } from 'sequelize';
import { Task } from './models/task.model';

export class DBConfig {
  static async connectDB() {
    const { DIALECT, STORAGE } = process.env;
    const sequelize = new Sequelize({
      dialect: DIALECT as Dialect,
      storage: STORAGE as string,
    });
    try {
      await sequelize.authenticate();
      logger.info('Connection to database has been established successfully.');
      await Task.sync();
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
    }
  }
}
