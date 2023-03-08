'use strict';

import { ITask, ITaskInsert, ITaskUpdate, Task } from '../database/models/task.model';

/**
 * Función que busca una task por id
 * @param id id de task
 * @returns {Promise<Task>} elemento de la bd obtenido por su id
 */
const findElemById = (id: number): Promise<Task | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const task = await Task.findByPk(id);
      resolve(task);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

/**
 * Función que obtiene resultados en base a una querie
 * @param query querie de consulta
 * @returns {Promise<INews[]>} elementos de la bd obtenidos
 */
const findElemsByQuerie = (query: Object): Promise<ITask[]> => {   
    return new Promise(async (resolve, reject) => {
      try {
        const elements: any = await Task.findAll(query);
        resolve(elements);
      } catch (error: any) {
        reject(new Error(error));
      }       
    });
  }

/**
 * Función que actualiza una task con querie
 * @param id id de la task
 * @param data datos a reemplazar en una task
 * @returns {Promise<ITask>} elemento de la bd actualizado
 */
const findOneAndUpdate = (id: number, data: ITaskUpdate): Promise<number[]> =>{
    return new Promise(async (resolve, reject) => {
      try {
        const element: any = await Task.update({...data},{where: {id}});
        resolve(element)
      } catch (error: any) {
        reject(new Error(error)); 
      }
    });
  }

/**
 * Función que guarda un documento en db
 * @param model modelo de la base de datos
 * @param data del documento a guardar
 * @returns {Promise<ITask>} documento guardado
 */
const insertData = (data: ITaskInsert): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const newTask: Task = Task.build({...data});
        const savedStatus = await newTask.save();
        resolve(savedStatus)
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  }

/**
 * Función que elimina varios documentos en db
 * @param model modelo de la base de datos
 * @param query consulta del doc a eliminar
 * @returns {Promise<number>} numero de elementos eliminados
 */
const deleteById = (id: number): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      try {
        const elements: any = await Task.destroy({where: {id}});
        resolve(elements)
      } catch (error: any) {
        reject(new Error(error));
      }    
    });
  };
export = {
  findElemById,
  findElemsByQuerie,
  insertData,
  findOneAndUpdate,
  deleteById
};
