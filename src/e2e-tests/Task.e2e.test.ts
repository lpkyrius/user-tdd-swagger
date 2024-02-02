import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import * as fs from 'fs';
import path from 'path';
import { mockedTasks } from './mockedTasks';
import { Task } from '../entities/Task';
import { ManageTaskTestFile } from '../repository/in-memory/ManageTaskTestFile';

// Mock console.log and console.error globally for the entire test suite
// So we keep a clear console when tests should return error 
// global.console.log = jest.fn();
// global.console.error = jest.fn();

describe('#E2E tests for tasks.', () => {
  const manageTaskTestFile = new ManageTaskTestFile();

  beforeAll(() => {
    // To reset our TasksFile.JSON
    const tempFile = manageTaskTestFile.getFile();
    const filePath: string = path.resolve(__dirname) + '/TasksFile.JSON';
    if (fs.existsSync(tempFile)) {
      manageTaskTestFile.resetFile();
    }
});

  describe('Test POST /task/add', () => {
    test('It should respond with 200 success + Content-Type = json.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'E2E Test summary #1',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(201);
            
        expect(response.body).toMatchObject(taskData);
        expect(response.body.summary).toBe('E2E Test summary #1');
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted userId.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-',
        summary: 'E2E Test summary #2 error',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid userId' });
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted summary.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: '',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid summary' });
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted task.', async () => {

      const taskData = {};
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid userId' });
    });

  });

  describe('Test GET /task/list', () => {
    test('It should respond with 200 success + Content-Type = json containing a Task like object.', async () => {
      manageTaskTestFile.resetFile();
      
      const response = await request(app)
          .get('/task/list')
          .expect('Content-Type', /json/)
          .expect(200);
          
          expect(response.body).toEqual(mockedTasks);
          expect(response.body).toMatchObject(mockedTasks);
          expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Test GET /task/find/:id', () => {
    test('It should respond with 200 success + Content-Type = json containing a Task like object.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskExpected: Task = Object.assign({}, response.body.slice(-1)[0]);
      
      const responseFind = await request(app)
          .get('/task/find/'+ taskExpected.id)
          .expect('Content-Type', /json/)
          .expect(200);
        
          expect(responseFind.body).toEqual(mockedTasks[1]);
          expect(responseFind.body).toMatchObject(mockedTasks[1]);
    });

    test('It should respond with 404 not found when trying to find an id that does not exist.', async () => {

      const responseUpdate = await request(app)
          .get('/task/find/this.id.should.not.exist')
          .expect('Content-Type', /json/)
          .expect(404);

          expect(responseUpdate.body).toEqual({ error: 'task not found' });
    });

  });

  describe('Test GET /task/update/:id', () => {
    test('It should respond with 200 success + Content-Type = json with the updated task.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskExpected: Task = Object.assign({}, response.body.slice(-1)[0]);
      taskExpected.summary = 'Updating task summary with this info!';
      
      const responseUpdate = await request(app)

          .put('/task/update/'+ taskExpected.id)
          .send(taskExpected)
          .expect('Content-Type', /json/)
          .expect(200);

          expect(responseUpdate.body).toEqual(taskExpected);
    });

    test('It should respond with 400 bad request when trying to update with a summary larger than 100 characters.', async () => {
      const repeatedSummary = 'A';
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskExpected: Task = Object.assign({}, response.body.slice(-1)[0]);

      taskExpected.summary = repeatedSummary.repeat(101);

      const responseUpdate = await request(app)

          .put('/task/update/'+ taskExpected.id)
          .send(taskExpected)
          .expect('Content-Type', /json/)
          .expect(400);

          expect(responseUpdate.body).toEqual({ error: 'invalid summary' });
    });

    test('It should respond with 404 when trying to update with a id that does not exist.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);
      
      const taskExpected: Task = Object.assign({}, response.body.slice(-1)[0]);
      taskExpected.id = 'this.id.should.not.exist';

      const responseUpdate = await request(app)

          .put('/task/update/'+ taskExpected.id)
          .send(taskExpected)
          .expect('Content-Type', /json/)
          .expect(404);

          expect(responseUpdate.body).toEqual({ error: 'task not found' });

    });
  });

  describe('Test DELETE /task/delete/:id', () => {
    test('It should respond with 200 success + Content-Type = json deleting a task.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskToDelete: Task = Object.assign({}, response.body.slice(-1)[0]);

      const responseDelete = await request(app)
          .delete('/task/delete/'+ taskToDelete.id)
          .expect('Content-Type', /json/)
          .expect(200);
          
          expect(responseDelete.body).toEqual({ message: 'success' });            
    });

    test('It should respond with 404 + Content-Type = json when trying to delete a task that does not exist.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskToDelete: Task = Object.assign({}, response.body.slice(-1)[0]);
      taskToDelete.id = 'this.id.should.not.exist';

      const responseDelete = await request(app)
          .delete('/task/delete/'+ taskToDelete.id)
          .expect('Content-Type', /json/)
          .expect(404);

        expect(responseDelete.body).toEqual({ message: 'task not found' });  
    });

  });

});