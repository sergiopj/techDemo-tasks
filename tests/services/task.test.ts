'use strict';
import { ITask, ITaskWithDataValues } from '../../src/database/models/task.model';
import {
  getById,
  getPendingTasksByUserId,
  updateById,
  deleteTask,
  insertTask,
} from '../../src/services/Task';
import {UPDATE_TASK_OBJECT, INSERT_TASK_OBJECT} from '../mocks/task.mock';

describe('TaskService', () => {

  let taskId: number;
  let usrId: number;

  describe('insertTask', () => {
    it('Validando que una task se ha insertado en la base de datos', async () => {
      // insert de la tarea en la db
      const result: any = await insertTask(INSERT_TASK_OBJECT); 
      const dataValues: ITaskWithDataValues = result.dataValues;
      // que la propiedad dataValues este definida y que no sea nula
      expect(dataValues).toBeDefined();
      expect(dataValues).not.toBeNull();
      const {title, description, pending, userId, createdAt, updatedAt, id} = dataValues;
      taskId = id;
      usrId = userId;
      // que las propiedades devueltas por insertTask sean las esperadas
      expect(title).toEqual('title test insert');      
      expect(description).toEqual('test desc insert');      
      expect(pending).toEqual(true);      
      expect(userId).toEqual(1234);
      // que el id de la task sea un numero y mayor que cero
      expect(typeof id).toEqual('number');
      expect(id).toBeGreaterThan(0);      
      // que las fechas sean de tipo Date
      expect(createdAt).toBeInstanceOf(Date);      
      expect(updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('getById', () => {
    it('Validando que una task cumple unos requisitos', async () => {
      const result: ITask = await getById(taskId);
      // contiene el id
      expect(result.id).toEqual(taskId);
      // fechas válidas
      expect(!isNaN(Date.parse(result.createdAt))).toBe(true);
      expect(!isNaN(Date.parse(result.updatedAt))).toBe(true);
      // tipo number y que sea mayor que 0
      expect(typeof result.userId).toBe('number');
      expect(result.userId).toBeGreaterThan(0);
      expect([0, 1]).toContain(result.pending);
      // tipo string y evitando vacios
      expect(typeof result.title).toBe('string');
      expect(result.title.length).toBeGreaterThan(0);
      expect(typeof result.description).toBe('string');
      expect(result.description.length).toBeGreaterThan(0);
    });
  });

  describe('getPendingTasksByUserId', () => {
    it('Valitando que el listado de task cumpla uno requisitos', async () => {

      const pendingTasks: ITask[] = await getPendingTasksByUserId(usrId);

      expect(Array.isArray(pendingTasks)).toBe(true);
      pendingTasks.forEach((result) => {
        // fechas válidas
        expect(!isNaN(Date.parse(result.createdAt))).toBe(true);
        expect(!isNaN(Date.parse(result.updatedAt))).toBe(true);
        // tipo number, que el usuario coincida y que sea mayor que 0
        expect(typeof result.userId).toBe("number");
        expect(result.userId).toEqual(usrId);
        expect(result.userId).toBeGreaterThan(0);
        expect([0, 1]).toContain(result.pending);
        // tipo string y evitando vacios
        expect(typeof result.title).toBe("string");
        expect(result.title.length).toBeGreaterThan(0);
        expect(typeof result.description).toBe("string");
        expect(result.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('updateById', () => {
    it('Valitando una task se ha actualizado correctamente', async () => {
      // true: actualizada false: no-actualizada
      const updateResult: ITaskWithDataValues = await updateById(taskId.toString(), UPDATE_TASK_OBJECT);
      // fechas válidas
      expect(!isNaN(Date.parse(updateResult.createdAt))).toBe(true);
      expect(!isNaN(Date.parse(updateResult.updatedAt))).toBe(true);
      // tipo number, que el usuario coincida y que sea mayor que 0
      expect(typeof updateResult.userId).toBe("number");
      expect(updateResult.userId).toBeGreaterThan(0);
      expect([0, 1]).toContain(updateResult.pending);
      // tipo string y evitando vacios
      expect(typeof updateResult.title).toBe("string");
      expect(updateResult.title.length).toBeGreaterThan(0);
      expect(typeof updateResult.description).toBe("string");
      expect(updateResult.description.length).toBeGreaterThan(0);
    });
  });

  describe('deleteTask', () => {
    it('Valitando que la eliminacion de una task es valida', async () => {
      // true: eliminada false: no-eliminada
      const deletedResult: boolean = await deleteTask(taskId);
      expect(typeof deletedResult).toBe('boolean');
    });
  });  

});
