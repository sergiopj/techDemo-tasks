'use strict';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
  * Middleware para comprobar que llegan los params requeridos
  * @param req 
  * @param res 
  * @param next 
*/

const paramsValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

export {
    paramsValidator
}