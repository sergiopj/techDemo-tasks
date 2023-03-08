'use strict';
import { Request, Response } from 'express';
import { ITask, ITaskInsert, ITaskUpdate } from '../database/models/task.model';
import {getById, getPendingTasksByUserId, insertTask, updateById, deleteTask} from '../services/Task';

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
      data 
          ? res.status(200).send({data, count: data.length})
          : res.status(404).send({message: 'Tasks pendientes no encontradas'});
    } catch (error: unknown) {     
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
      data 
          ? res.status(200).send(data)
          : res.status(404).send({message: 'Task no encontrada'}); 
    } catch (error) {     
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
    return res.status(200).send({eliminated: success});
  } catch (error) {   
    res.status(500).send({message: 'Error al elmininar la noticia'});
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
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({message: 'Error al añadir la nueva task'});
  }
};

/**
 * Controlador actualiza un task existente por id
 * @param req 
 * @param res 
 * @returns {ITask}
 */
  
const updateTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const success: boolean = await updateById(id, data);
    res.status(200).send({success}); 
  } catch (error) {   
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