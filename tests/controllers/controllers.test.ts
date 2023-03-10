'use strict';
import request from 'supertest';
import app from '../../src/app';
import { ITask } from '../../src/database/models/task.model';
import { IParamsValidator } from '../../src/database/models/responses.model';
import { UPDATE_TASK_OBJECT, INSERT_TASK_OBJECT, INSERT_TASK_OBJECT_INCOMPLETE } from '../common/mocks/task.mock';
import { expectValidatorTasks, expectValidatorResponses } from '../common/utils.test';

describe('Controllers endpoints pruebas de los distintos metodos', () => {

  let taskId: number;
  let userId: number;

  it('POST /task añade una nueva task | 201 status code', async () => {
    const response = await request(app).post('/task').send(INSERT_TASK_OBJECT);
    expect(response.status).toBe(201);
    const task: ITask = response.body;
    taskId = response.body?.id;
    userId = response.body?.userId;
    expectValidatorTasks(task);
  });

  it('POST /task no puede añadir una nueva task | 404 status code', async () => {
    const response = await request(app).post('/task').send(INSERT_TASK_OBJECT_INCOMPLETE);
    expect(response.status).toBe(400);
    const result: IParamsValidator[] = response.body?.errors;  
    expect(Array.isArray(result)).toBe(true);
    // validacion funcional
    result.forEach(expectValidatorResponses);    
  });
  

  it('GET /tasks/:userId retornada un array de tasks | 200 status code', async () => {
    const response = await request(app).get(`/tasks/${userId}`);
    const { data, count }: { data: ITask[], count: number } = response.body;
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(typeof count).toBe('number');
    data.forEach(expectValidatorTasks);   
  });

  it('GET /task/:id no puede obtener una task por id | 404 status code', async () => {
    const tskId = 999;
    const response = await request(app).get(`/task/${tskId}`);
    expect(response.status).toBe(404);
    const result: IParamsValidator = response.body;  
    expect(result).toHaveProperty('msg');
    expect(result.msg).toBe('Task no encontrada');    
  }); 

  it('PUT /task-update/:id actualiza una task existente por id | 201 status code', async () => {
    const response = await request(app).put(`/task-update/${taskId}`).send(UPDATE_TASK_OBJECT);
    expect(response.status).toBe(201);
    const task: ITask = response.body;
    expectValidatorTasks(task);  
  });  

  it('PUT /task/:id no puede actualizar una task por id | 400 status code', async () => {
    const tskId = 999;
    const response = await request(app).put(`/task-update/${tskId}`).send(UPDATE_TASK_OBJECT);
    expect(response.status).toBe(404);
    const result: IParamsValidator = response.body;
    expect(result).toHaveProperty("msg");
    expect(result.msg).toBe("No se ha podido actualizar la task");    
  }); 

  it('DELETE /task-delete/:id elimina una task existente mediante su id | 200 status code', async () => {
    const response = await request(app).delete(`/task-delete/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.eliminated).toBe(true);
  });  

  it('DELETE /task-delete/:id no encuentra la task a eliminar | 404 status code', async () => {
    const tskId = 999;
    const response = await request(app).delete(`/task-delete/${tskId}`);
    expect(response.status).toBe(404);
    const result: IParamsValidator = response.body;
    expect(result).toHaveProperty("msg");
    expect(result.msg).toBe("Task a eliminar no encontrada");    
  });  

});

describe('Swagger api-docs verificación hmtl 200 status code', () => {
  it('GET /api-docs debe de retornar un html con la doc para probar los endpoints', async () => {
    const response = await request(app).get('/api-docs').redirects(1);
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text.includes('<title>Swagger UI</title>')).toBe(true);
  });
});