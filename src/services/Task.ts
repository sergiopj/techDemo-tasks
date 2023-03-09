'use strict';
import { ITask, ITaskInsert, ITaskUpdate, Task } from '../database/models/task.model';
import DbQueries from './DbQueries';

/**
 * Función para obtener todos los task
 * @param userId - Identificador del user
 * @returns {Promise<ITask[]>}
 */

const getPendingTasksByUserId = async (userId: number): Promise<ITask[]> => {
  try {
    const querie: object = {
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
 * @param id - Identificador de la task
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
 * Función para eliminar una task por id
 * @param id - Identificador de la task
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
 * Función para añadir una task
 * @param data - Datos de la task a actualizar
 * @returns {Promise<Itask>}
 */
const insertTask = async (data: ITaskInsert): Promise<ITask> => {
  //TODO revisar por que se insertan fechas con una hora anterior a la española
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
 * @param id - Identificador de la tarea
 * @param data - Datos de la tarea a actualizar
 * @returns {Promise<Itask>}
 */
const updateById = async (id: string, data: ITaskUpdate): Promise<any> => {
  try {   
    const [updated]: number[] = await DbQueries.findOneAndUpdate(parseInt(id), data);
    //TODO intentar devolverlo con la consulta de update y no hacer dos con un returning = true
    if(updated === 1) {
      const task: Task | null = await DbQueries.findElemById(parseInt(id));      
      return task;        
    }      
  } catch (error) {
    const message: string = error instanceof Error
      ? error.message
      : 'Unknown Error';
    throw new Error(`Error al actualizar la task con id ${id} - error: ${message}`);
  }
};

export { getPendingTasksByUserId, getById, deleteTask, insertTask, updateById };
