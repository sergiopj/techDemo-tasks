import { ITask } from '../../src/database/models/task.model';
import { IParamsValidator } from '../../src/database/models/responses.model';

export const expectValidatorTasks = (task: ITask) => {
  expect(typeof task.id).toBe('number');
  expect(task).toHaveProperty('userId');
  expect(typeof task.userId).toBe('number');
  expect(task).toHaveProperty('title');
  expect(typeof task.title).toBe('string');
  expect(task).toHaveProperty('description');
  expect(typeof task.description).toBe('string');
  expect(task).toHaveProperty('pending');
  expect(typeof task.pending === 'boolean' || typeof task.pending === 'number').toBe(true);
}

export const expectValidatorResponses = (elem: IParamsValidator) => {
    expect(elem).toHaveProperty('msg');
    expect(typeof elem.msg).toBe('string');
    expect(elem).toHaveProperty('param');
    expect(typeof elem.msg).toBe('string');
    expect(elem).toHaveProperty('location');
    expect(typeof elem.location).toBe('string');
}
  
