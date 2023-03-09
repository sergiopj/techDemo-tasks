'use strict';
import { Request, Response } from 'express';
import { ITask, ITaskInsert, ITaskUpdate } from '../database/models/task.model';
import {getById, getPendingTasksByUserId, insertTask, updateById, deleteTask} from '../services/Task';
import { Logger } from '../services/Logger';
const logger = Logger.getLogger('task.controller');

/**
  * Controlador todas las tareas pendientes
  * @param req 
  * @param res 
  * @returns {Json}
*/

const getPendingTasks = async (req: Request, res: Response) => {
    const { userId } = req.params ;
    try { 
      const data: ITask[] = await getPendingTasksByUserId(parseInt(userId)); 
      logger.info('::getPendingTasks | Inicio de obtencion de todos los task pendientes');
      data 
          ? res.status(200).send({data, count: data.length})
          : res.status(404).send({message: 'Tasks pendientes no encontradas'});
    } catch (error: unknown) {  
      logger.error(`::getPendingTasks | Error al obtener todas los task pendientes - error : ${error}`);   
      res.status(500).send({message: 'Error al obtener las tasks pendientes'});
    }
};
  
/**
 * Controlador develve el task por un id determinado
 * @param req 
 * @param res 
 * @returns {ITask}
 */
  
const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params ;
    try {
      const data: ITask = await getById(parseInt(id));
      logger.info(`::getTaskById | Inicio de obtencion de task por id : ${id}`);
      data 
          ? res.status(200).send(data)
          : res.status(404).send({message: 'Task no encontrada'}); 
    } catch (error) {     
      logger.error(`::getTaskById | Error al obtener la task - error : ${error}`);
      res.status(500).send({message: `Error al obtener la task por id : ${id}`});
    }
};

/**
 * Controlador elimina un task determinado
 * @param req 
 * @param res 
 * @returns {Json} estado de la eliminacion
 */
  
const deleteTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const success: boolean = await deleteTask(parseInt(id));  
    logger.info(`::deleteTaskById | Inicio de de eliminacion de task por id : ${id}`);
    success 
      ? res.status(200).send({eliminated: success})
      : res.status(404).send({message: 'Task a eliminar no encontrada'}); 
  } catch (error) {   
    logger.error(`::deleteTaskById | Error al eliminar la task ${id} - error : ${error}`);
    res.status(500).send({message: 'Error al elmininar la task'});
  }
};

/**
 * Controlador añade una nueva task
 * @param req 
 * @param res 
 * @returns {ITask}
 */
const addNewTask = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: ITaskInsert = await insertTask(data);
    logger.info('::addNewTask | Inicio de insercion de una task');
    //TODO revisar bien todos los statuscode
    result 
      ? res.status(201).send(result)
      : res.status(404).send({message: 'No se ha podido añadir la task'}); 
  } catch (error) {
    logger.error(`::addNewTask | Error al añadir la nueva task - error : ${error}`);
    res.status(500).send({message: 'Error al añadir la nueva task'});
  }
};

/**
 * Controlador actualiza un task existente por id
 * @param req 
 * @param res 
 * @returns {Json}
 */
  
const updateTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const task: ITask = await updateById(id, data);
    logger.info('::updateTaskById | Incion de actualización de una task');
    task
      ? res.status(201).send(task)
      : res.status(404).send({message: 'No se ha podido actualizar la task'}); 
  } catch (error) {   
    logger.error(`::updateTaskById | Error al actualizar la task ${id} - error : ${error}`);
    res.status(500).send({message: 'Error al actualizar la task'});
  }
};

export {
    getPendingTasks,
    getTaskById,
    addNewTask,
    updateTaskById,
    deleteTaskById
}