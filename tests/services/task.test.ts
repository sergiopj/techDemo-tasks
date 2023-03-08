'use strict';
import { ITask } from '../../src/database/models/task.model';
import {
  getById,
  getPendingTasksByUserId,
  updateById,
  deleteTask,
  insertTask,
} from '../../src/services/Task';
import {UPDATE_TASK_OBJECT, INSERT_TASK_OBJECT} from './mocks/task.mock';

describe('TaskService', () => {


  describe('insertTask', () => {
    it('Validando que una task se ha insertado en la base de datos', async () => {

      // insert de la tarea en la db
      const result: any = await insertTask(INSERT_TASK_OBJECT);  

      // que la propiedad dataValues este definida y que no sea nula
      expect(result.dataValues).toBeDefined();
      expect(result.dataValues).not.toBeNull();

      const {title, description, pending, userId, createdAt, updatedAt, id} = result.dataValues;

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

      const id: number = 1;
      const result: ITask = await getById(id);

      // contiene el id
      expect(result.id).toEqual(id);
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

      const userId: number = 1234;
      const pendingTasks: ITask[] = await getPendingTasksByUserId(userId);

      expect(Array.isArray(pendingTasks)).toBe(true);
      pendingTasks.forEach((result) => {
        // fechas válidas
        expect(!isNaN(Date.parse(result.createdAt))).toBe(true);
        expect(!isNaN(Date.parse(result.updatedAt))).toBe(true);
        // tipo number, que el usuario coincida y que sea mayor que 0
        expect(typeof result.userId).toBe('number');
        expect(result.userId).toEqual(userId);
        expect(result.userId).toBeGreaterThan(0);
        expect([0, 1]).toContain(result.pending);
        // tipo string y evitando vacios
        expect(typeof result.title).toBe('string');
        expect(result.title.length).toBeGreaterThan(0);
        expect(typeof result.description).toBe('string');
        expect(result.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('updateById', () => {
    it('Valitando una task se ha actualizado correctamente', async () => {
      const id: string = '1';
      // true: actualizada false: no-actualizada
      const updateResult: boolean = await updateById(id, UPDATE_TASK_OBJECT);
      expect(typeof updateResult).toBe('boolean');
    });
  });

  describe('deleteTask', () => {
    it('Valitando que la eliminacion de una task es valida', async () => {
      const id: number = 4;
      // true: eliminada false: no-eliminada
      const deletedResult: boolean = await deleteTask(id);
      expect(typeof deletedResult).toBe('boolean');
    });
  });  

});
