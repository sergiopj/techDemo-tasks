'use strict';
import * as express from 'express';
const Router = express.Router();
import { check } from 'express-validator';
import { getTaskById, getPendingTasks, addNewTask, updateTaskById, deleteTaskById} from '../controllers/task.controller';
import { paramsValidator } from '../middlewares/ParamsValidator';

Router.get('/tasks/:userId', 
  [
    check('userId', 'userId es obligatorio').not().isEmpty(),
    paramsValidator
  ],
  getPendingTasks
);
Router.get('/task/:id', 
  [
    check('id', 'Id es obligatorio').not().isEmpty(),
    paramsValidator
  ],
  getTaskById
);
Router.post(
  '/task',
  [
    check('userId', 'userId es obligatorio').not().isEmpty(),
    check('title', 'Title es obligatorio').not().isEmpty(),
    check('description', 'Description es obligatorio').not().isEmpty(),
    paramsValidator,
  ],
  addNewTask
);
Router.put(
  '/task-update/:id',
  [
    check('id', 'Id es obligatorio').not().isEmpty(),
    check('title', 'Title es obligatorio').not().isEmpty(),
    check('description', 'Description es obligatorio').not().isEmpty(),
    check('pending', 'pending es obligatorio').not().isEmpty(),
    paramsValidator
  ],
  updateTaskById
);
Router.delete(
  '/task-delete/:id',
  [
    check('id', 'Id es obligatorio').not().isEmpty(),
    paramsValidator,
  ],
  deleteTaskById
);

export default Router;
