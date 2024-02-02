import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import { Task } from '../entities/Task';
import { ITaskRepository } from '../repository/ITaskRepository';
import { TaskService } from './TaskService';
import { TasksRepositoryInMemory } from '../repository/in-memory/TasksRepositoryInMemory';

describe('#taskService', () => {

  let tasksRepository: ITaskRepository;
  let taskService: TaskService;

  beforeAll(() => {
    tasksRepository = new TasksRepositoryInMemory();
    taskService = new TaskService(tasksRepository);
  });

  describe('#Task exists', () => {
    let task: Task; 

    it('should return false when check if a non-existent task exists', async () => {
      const checkTask = {
        id: '123abc',
        summary: 'Test summary not existent task.',
      };
      const expected: boolean = await taskService.exist(checkTask.id!);

      expect(expected).toBe(false);
    });
  });

  describe('#Create Tasks', () => {
    let task: Task; 

    it('should be able to create a new task and confirm it exists', async () => {
      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'Test summary created with unit test.',
      };

      task = await taskService.add(taskData);
      const expected: boolean = await taskService.exist(task.id!);

      expect(expected).toBe(true);
      expect(task).toHaveProperty('id');
      expect(task.summary).toBe('Test summary created with unit test.');
    });

  });
  
  describe('#List Tasks', () => {
    let tasks: Task[]; 
    const expectedStructure = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        userId: expect.any(String),
        summary: expect.any(String),
        created_at: expect.any(String),
      }),
    ]);

    it('should receive an array of tasks', async () => {
      tasks = await taskService.list();

      expect(tasks).toBeInstanceOf(Array);
      expect(tasks).toEqual(expectedStructure);
    });

  });

  describe('#Update Tasks', () => {
    let task: Task, updatedTask: Task; 

    it('should be able to update an existent task', async () => {
      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'Test summary to be updated',
      };

      task = await taskService.add(taskData);

      let taskExpected: Task = Object.assign({}, task);
      taskExpected.summary = 'Test summary already updated!!!';

      updatedTask = await taskService.update(taskExpected);

      expect(updatedTask).toHaveProperty('id');
      expect(updatedTask.summary).toBe('Test summary already updated!!!');
    });
    
    it('should throw an error when updating a non-existing task on TaskService', async () => {
      const taskError: Task = {
        id: 'this.id.should.not.exist',
        summary: 'Test summary to be throw error',
      };
      await expect(async () => {
        const updatedTaskError: Task = await taskService.update(taskError);
      }).rejects.toThrow('task not found');
    });

  });

  describe('#Delete Tasks', () => {

    it('should be able to delete an existent task', async () => {
      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'Test summary to be deleted',
      };

      const task: Task = await taskService.add(taskData);
      const expectedBefore: boolean = await taskService.exist(task.id!);

      const deletedTask = await taskService.delete(task.id!);
      const expectedAfter: boolean = await taskService.exist(task.id!);

      expect(deletedTask).toBeTruthy;
      expect(expectedBefore).toBe(true);
      expect(expectedAfter).toBe(false);
    });

    it('should return false when deleting a non-existing task on TaskService', async () => {
      const testDel = async function () {
        return await taskService.delete('this.id.should.not.exist');
      }
      expect(await testDel()).toBeFalsy;
    });

  });

});