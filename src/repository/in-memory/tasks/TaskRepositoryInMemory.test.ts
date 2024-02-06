import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import { TasksRepositoryInMemory } from './TaskRepositoryInMemory';
import { ITaskRepository } from '../ITaskRepository';


describe('#taskService', () => {

  let tasksRepository: ITaskRepository;

  beforeAll(() => {
    tasksRepository = new TasksRepositoryInMemory();
  });


  describe('#Find Task by Id', () => {
    it('should throw an error if the task ID is not found', async () => { 
        try {
          await tasksRepository.findTaskById('this.id.should.not.exist');
        } catch (error: any) {
          expect(error.message).toBe('Id not found');
        }
      });
  });

  describe('#Delete Tasks', () => {
    it('should return false when deleting a non-existing task on RepositoryInMemory', async () => {
      const testDel = async function () {
        return await tasksRepository.delete('this.id.should.not.exist');
      }
      expect(await testDel()).toBeFalsy();
    });
  });

});