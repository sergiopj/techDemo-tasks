'use strict';
import moment from 'moment';
import { configure, getLogger } from 'log4js';
const loggerConfig = require('../config/logger');

export class Logger {

  /**
   * @param logStr string para generar la traza de log
   * @returns {Logger}
  */  
  
  static getLogger(logStr: string) {
    Logger.initLogger();
    return getLogger(logStr);
  }

  /**
    * Función que inicia la ejecucion por consola y creacion de ficheros de log 
    * @returns {void} numero de elementos eliminados 
   */
  static initLogger(): void {
    configure({
      appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
          type: 'dateFile',
          filename: `${loggerConfig.path}/${loggerConfig.filename}_${moment().format('DD-MM-YYYY')}.log`,
          layout: { type: 'basic' },
          compress: true,
          keepFileExt: true,
        },
      },
      categories: {
        default: { appenders: ['console', 'dateFile'], level: 'info' },
      },
    });
  }
}

