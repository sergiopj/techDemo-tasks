'use strict';
import app from './app';
import { DBConfig } from './database/DbRun';
import { Logger } from './services/Logger';
const logger = Logger.getLogger('server');
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    DBConfig.connectDB();
    logger.info(`Servidor arrancado en el port ${port}`)
});  
  