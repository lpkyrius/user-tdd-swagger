import { expect, describe, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import { mockedUsers } from './mockedUsers';
import { User } from '../../entities/User';
import { ManageUserTestFile } from '../../repository/in-memory/users/ManageUserTestFile';

require('dotenv').config();
const e2eTestEnabled: boolean = ((process.env.ENABLE_E2E_TESTS || 'Y') === 'Y')

// Mock console.log and console.error globally for the entire test suite
// So we keep a clear console when tests should return error 
// global.console.log = jest.fn();
// global.console.error = jest.fn();

if (!e2eTestEnabled) {
    describe.skip('End-to-End Tests', () => {
      test.skip('All end-to-end tests are skipped because e2e tests are disabled.', () => {});
    });
  } else {
    describe('#E2E tests for users.', () => {
        const manageUserTestFile = new ManageUserTestFile();

        beforeAll(() => {
            manageUserTestFile.resetFile();
        });

        describe('Test POST /user/add', () => {
            test('It should respond with 200 success + Content-Type = json.', async () => {
                const userData: User = {
                    email: 'success.test.tech@email.com',
                    password: 'success.test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);

                  expect(response.body).toHaveProperty('id');
                  expect(response.body.email).toBe('success.test.tech@email.com');
              });

            test('It should respond with 400 bad request + Content-Type = json for bad formatted email.', async () => {
                const userData: User = {
                    email: 'test.techemail.com',
                    password: 'test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid email' })
            })

            test.skip('It should respond with 400 bad request + Content-Type = json for bad formatted password.', async () => {
                const userData: User = {
                    email: 'test.tech@email.com',
                    password: '',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid password' })
            })

            test.skip('It should respond with 400 bad request + Content-Type = json for a password larger than 100.', async () => {
                const repeatString: string = 'x'
                const userData: User = {
                    email: 'test.tech@email.com',
                    password: repeatString.repeat(101),
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid password' })
            })

            test('It should respond with 400 bad request + Content-Type = json for an existent email.', async () => {
                const userData: User = {
                    email: 'existent@email.com',
                    password: 'existent@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);

                expect(response.body.email).toBe('existent@email.com');

                const responseError = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(responseError.body).toEqual({ error: 'email already exists' })
            })

            test('It should respond with 400 bad request + Content-Type = json for bad formatted role (!1 or !2).', async () => {
                const userData: User = {
                    email: 'bad.role@email.com',
                    password: 'bad.role@123',
                    role: '3'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid role' })
            })
            
            test('It should respond with 400 bad request + Content-Type = json for bad formatted user.', async () => {
                const userData = { };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid email' })
            })
        })

        describe('Test GET /user/list', () => {
            test.todo('It should respond with 200 success + Content-Type = json containing a User like object.')
        })

        describe('Test GET /user/find/:id', () => {
            test.todo('It should respond with 200 success + Content-Type = json containing an user like object.')
            
            test.todo('It should respond with 404 not found when trying to find an id that does not exist.')
        })

        describe('Test GET /user/update/:id', () => {
            test.todo('It should respond with 200 success + Content-Type = json with the updated user.')
            
            test.todo('It should respond with 400 bad request when trying to update with a bad email format.')
            
            test.todo('It should respond with 400 bad request when trying to update with an email larger than 100 characters.')
            
            test.todo('It should respond with 404 when trying to update with a id that does not exist.')
        })

    })
}