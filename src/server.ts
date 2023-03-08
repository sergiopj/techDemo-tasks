'use strict';
import app from './app';
import { DBConfig } from './database/DbRun';
const port = process.env.PORT || 3000;


app.listen(port, () =>{
    DBConfig.connectDB();
    console.log(`Servidor arrancado en el port ${port}`)
});  
  