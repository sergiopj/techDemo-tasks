'use strict';
import { ITask, ITaskWithDataValues } from '../../src/database/models/task.model';
import {
  getById,
  getPendingTasksByUserId,
  updateById,
  deleteTask,
  insertTask,
} from '../../src/services/Task';
import { UPDATE_TASK_OBJECT, INSERT_TASK_OBJECT } from '../common/mocks/task.mock';
import { expectValidatorTasks } from '../common/utils.test';

describe('TaskService', () => {

  let taskId: number;
  let usrId: number;

  describe('insertTask', () => {
    it('Validando que una task se ha insertado en la base de datos', async () => {
      const result: any = await insertTask(INSERT_TASK_OBJECT); 
      const insertResult: ITaskWithDataValues = result.dataValues;
      // que la propiedad dataValues este definida y que no sea nula
      const { userId, createdAt, updatedAt, id } = insertResult;
      taskId = id;
      usrId = userId;    
      // que las fechas sean de tipo Date      
      expect(createdAt).toBeInstanceOf(Date);      
      expect(updatedAt).toBeInstanceOf(Date);
      // resto de validaciones
      expectValidatorTasks(insertResult);
    });
  });

  describe('getById', () => {
    it('Validando que una task cumple unos requisitos', async () => {
      const result: ITask = await getById(taskId);
      // tipo number y que sea mayor que 0
      expect([0, 1]).toContain(result.pending);
      // que las fechas sean de tipo Date
      expect(result.createdAt).toBeInstanceOf(Date);      
      expect(result.updatedAt).toBeInstanceOf(Date);
      // resto de validaciones
      expectValidatorTasks(result);
    });
  });

  describe('getPendingTasksByUserId', () => {
    it('Valitando que el listado de task cumpla unos requisitos', async () => {
      const pendingTasks: ITask[] = await getPendingTasksByUserId(usrId);
      expect(Array.isArray(pendingTasks)).toBe(true);      
      pendingTasks.forEach(expectValidatorTasks);
    });
  });

  describe('updateById', () => {
    it('Valitando una task se ha actualizado correctamente', async () => {
      // true: actualizada false: no-actualizada
      const updateResult: ITaskWithDataValues = await updateById(taskId.toString(), UPDATE_TASK_OBJECT);
      // fechas válidas
      expect(!isNaN(Date.parse(updateResult.createdAt))).toBe(true);
      expect(!isNaN(Date.parse(updateResult.updatedAt))).toBe(true);
      // 1 pending 0 no-pending
      expect([0, 1]).toContain(updateResult.pending);
      expectValidatorTasks(updateResult);      
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
