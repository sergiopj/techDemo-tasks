import request from 'supertest';
import app from '../../src/app';
import { ITask } from '../../src/database/models/task.model';
import {UPDATE_TASK_OBJECT, INSERT_TASK_OBJECT} from '../mocks/task.mock';

describe('Controllers endpoints pruebas de los distintos metodos', () => {

  let taskId: number;
  let userId: number;

  it('POST /task añade una nueva task 201 status code', async () => {
    const response = await request(app).post('/task').send(INSERT_TASK_OBJECT);
    expect(response.status).toBe(201);
    const task: ITask = response.body;
    taskId = response.body.id;
    userId = response.body.userId;
    expect(task).toHaveProperty('id');
    expect(typeof task.id).toBe('number');
    expect(task).toHaveProperty('userId');
    expect(typeof task.userId).toBe('number');
    expect(task).toHaveProperty('title');
    expect(typeof task.title).toBe('string');
    expect(task).toHaveProperty('description');
    expect(typeof task.description).toBe('string');
    expect(task).toHaveProperty('pending');
      expect(typeof task.pending).toBe('boolean');
    });
  

  it('GET /tasks/:userId retornada un array de tasks 200 status code', async () => {
    const response = await request(app).get(`/tasks/${userId}`);
    //TODO revisar mas posibles tipados de este tipo etc
    const { data, count }: { data: ITask[], count: number } = response.body;
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(typeof count).toBe('number');
    //TODO hacer una funcion para comprobar los tipo itask aqui y en otros test
    data.forEach((task: ITask) => {
      expect(task).toHaveProperty('id');
      expect(typeof task.id).toBe('number');
      expect(task).toHaveProperty('userId');
      expect(typeof task.userId).toBe('number');
      expect(task).toHaveProperty('title');
      expect(typeof task.title).toBe('string');
      expect(task).toHaveProperty('description');
      expect(typeof task.description).toBe('string');
      expect(task).toHaveProperty('pending');
      expect(typeof task.pending).toBe('number');
    });    
  });

  it('GET /task/:id retorna una task por id 200 status code', async () => {
    const response = await request(app).get(`/task/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taskId);
    const task: ITask = response.body;
    expect(task).toHaveProperty('id');
      expect(typeof task.id).toBe('number');
      expect(task).toHaveProperty('userId');
      expect(typeof task.userId).toBe('number');
      expect(task).toHaveProperty('title');
      expect(typeof task.title).toBe('string');
      expect(task).toHaveProperty('description');
      expect(typeof task.description).toBe('string');
      expect(task).toHaveProperty('pending');
      expect(typeof task.pending).toBe('number');
  }); 

  it('PUT /task-update/:id actualiza una task existente por id 201 status code', async () => {
    const response = await request(app).put(`/task-update/${taskId}`).send(UPDATE_TASK_OBJECT);
    expect(response.status).toBe(201);
    const task: ITask = response.body;
      expect(typeof task.id).toBe('number');
      expect(task).toHaveProperty('userId');
      expect(typeof task.userId).toBe('number');
      expect(task).toHaveProperty('title');
      expect(typeof task.title).toBe('string');
      expect(task).toHaveProperty('description');
      expect(typeof task.description).toBe('string');
      expect(task).toHaveProperty('pending');
      expect(typeof task.pending).toBe('number');
  });  

  it('DELETE /task-delete/:id elimina una task existente mediante su id 200 status code', async () => {
    const response = await request(app).delete(`/task-delete/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.eliminated).toBe(true);
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