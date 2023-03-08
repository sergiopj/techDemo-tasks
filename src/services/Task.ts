'use strict';
import { ITask, ITaskInsert, ITaskUpdate, Task } from '../database/models/task.model';
import DbQueries from './DbQueries';
import { Logger } from './Logger';
const logger = Logger.getLogger('Task');

/**
 * Función para obtener todos los task
 * @returns {Promise<Object>}
 */

const getPendingTasksByUserId = async (userId: number): Promise<ITask[]> => {
  try {
    const querie = {
      where: {
        userId,
        pending: 1,
      },
      order: [['updatedAt', 'DESC']],
    };
    const pendingTasks: ITask[] = await DbQueries.findElemsByQuerie(querie);
    return pendingTasks.length > 0 
      ? pendingTasks 
      : [];
  } catch (error: unknown) {
    const message: string = error instanceof Error 
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error al obtener las noticias - error: ${message}`);
  }
};

/**
 * Función para obtener una task por id
 * @returns {Promise<ITask>}
 */
const getById = async (id: number): Promise<ITask> => {
  try {
    const task: Task | null = await DbQueries.findElemById(id);
    return task
      ? task.dataValues
      : null;
  } catch (error: unknown) {
    const message: string = error instanceof Error
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error al obtener la task por id - error: ${message}`);
  }
};

/**
 * Función para eliminar una noticia por id
 * @returns {Promise<boolean>}
 */
const deleteTask = async (id: number): Promise<boolean> => {
  try {
    const deleted: number = await DbQueries.deleteById(id);
    return deleted === 1;
  } catch (error) {
    const message: string = error instanceof Error 
        ? error.message
        : 'Unknown Error';   
    throw new Error(`Error al eliminar la task - error: ${message}`);
  }
};

/**
 * Función para añadir una noticia
 * @returns {Promise<INews>}
 */
const insertTask = async (data: ITaskInsert): Promise<ITask> => {
  try {
    const taskData: ITask = await DbQueries.insertData(data);
    return taskData;
  } catch (error) {
    const message: string = error instanceof Error 
      ? error.message
      : 'Unknown Error';   
    throw new Error(`Error al añadir la nueva task - error: ${message}`);
  }
};

/**
 * Función para actualizar una task
 * @returns {Promise<Itask>}
 */
const updateById = async (id: string, data: ITaskUpdate): Promise<any> => {
  try {   
    const [updated]: number[] = await DbQueries.findOneAndUpdate(parseInt(id), data);
    //TODO intentar devolverlo con la consulta de update y no hacer dos con un returning = true
    if(updated === 1) {
      const task: Task | null = await DbQueries.findElemById(parseInt(id));      
      return task || {};        
    }      
  } catch (error) {
    const message: string = error instanceof Error
      ? error.message
      : 'Unknown Error';
    throw new Error(`Error al actualizar la task con id ${id} - error: ${message}`);
  }
};

export { getPendingTasksByUserId, getById, deleteTask, insertTask, updateById };
