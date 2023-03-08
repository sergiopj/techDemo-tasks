"use strict";
import { ITask, ITaskInsert, ITaskUpdate, Task } from "../database/models/task.model";
import DbQueries from "./DbQueries";
import { Logger } from "./Logger";
const logger = Logger.getLogger("Task");

/**
 * Función para obtener todos los task
 * @returns {Promise<Object>}
 */

const getPendingTasksByUserId = async (userId: number): Promise<ITask[]> => {
  // TODO remplantear el sentido de algunos logger.info
  logger.info(
    "::getPendingTasksByUserId | Consulta para obtener todos los task"
  );
  try {
    const querie = {
      where: {
        userId,
        pending: 1,
      },
      order: [["updatedAt", "DESC"]],
    };
    const pendingTasks: ITask[] = await DbQueries.findElemsByQuerie(querie);
    return pendingTasks.length > 0 
      ? pendingTasks 
      : [];
  } catch (error: unknown) {
    const message: string = error instanceof Error 
        ? error.message 
        : "Unknown Error";
    logger.error(`::getPendingTasksByUserId | Error al obtener todas las noticias - error : ${message}`);
    throw new Error(`Error al obtener las noticias - error: ${error}`);
  }
};

/**
 * Función para obtener una task por id
 * @returns {Promise<ITask>}
 */
const getById = async (id: number): Promise<ITask> => {
  logger.info(`::getById | Consulta para obtener una task por id : ${id}`);
  try {
    const task: Task | null = await DbQueries.findElemById(id);
    return task ? task.dataValues : null;
  } catch (error: unknown) {
    // TODO llevar los logs de ok y error al controller aqui solo dejar el throw
    const message: string =
      error instanceof Error ? error.message : "Unknown Error";
    logger.error(`::getById | Error al obtener la task - error : ${message}`);
    throw new Error(`Error al obtener la task por id - error: ${error}`);
  }
};

/**
 * Función para eliminar una noticia por id
 * @returns {Promise<boolean>}
 */
const deleteTask = async (id: number): Promise<boolean> => {
  logger.info(`::deleteTask | Consulta para eliminar una task por id : ${id}`);
  try {
    const deleted: number = await DbQueries.deleteById(id);
    return deleted === 1 
      ? true 
      : false;
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unknown Error";
    logger.error(
      `::deleteById | Error al eliminar la task - error : ${message}`
    );
    throw new Error(`Error al eliminar la task - error: ${error}`);
  }
};

/**
 * Función para añadir una noticia
 * @returns {Promise<INews>}
 */
const insertTask = async (data: ITaskInsert): Promise<ITask> => {
  logger.info("::insertTask | Consulta para añadir una task");
  // TODO ajustar a una hora mas el created y updated
  try {
    const taskData: ITask = await DbQueries.insertData(data);
    return taskData;
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unknown Error";
    logger.error(
      `::insertTask | Error al añadir la nueva task - error : ${message}`
    );
    throw new Error(`Error al añadir la nueva task - error: ${error}`);
  }
};

/**
 * Función para actualizar una task
 * @returns {Promise<boolean>}
 */
const updateById = async (id: string, data: ITaskUpdate): Promise<boolean> => {
  logger.info("::updateById | Consulta para actualizar una noticia");
  try {   
    const updated: number[] = await DbQueries.findOneAndUpdate(parseInt(id), data);
    return updated[0] === 1 
      ? true 
      : false;
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : "Unknown Error";
    logger.error(
      `::updateById | Error al actualizar la task - error : ${message}`
    );
    throw new Error(
      `Error al actualizar la task con id ${id} - error: ${error}`
    );
  }
};

export { getPendingTasksByUserId, getById, deleteTask, insertTask, updateById };
