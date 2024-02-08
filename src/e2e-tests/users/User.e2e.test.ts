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

                expect(response.body).toEqual({ error: 'invalid email' });
            })

            test('It should respond with 400 bad request + Content-Type = json for bad formatted password.', async () => {
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

                expect(response.body).toEqual({ error: 'password should contain between 8 and 100 characters' });
            })

            test('It should respond with 400 bad request + Content-Type = json for a password larger than 100.', async () => {
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

                expect(response.body).toEqual({ error: 'password should contain between 8 and 100 characters' });
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

                expect(responseError.body).toEqual({ error: 'email already exists' });
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

                expect(response.body).toEqual({ error: 'invalid role' });
            })
            
            test('It should respond with 400 bad request + Content-Type = json for bad formatted user.', async () => {
                const userData = { };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(400);

                expect(response.body).toEqual({ error: 'invalid email' });
            })
        })

        describe('Test POST /user/login', () => {
            test('It should respond with 200 success + Content-Type = json.', async () => {
                const userData = {
                    email: 'mary.tech@email.com',
                    password: 'mary.tech@123'
                };
                const response = await request(app)
                    .post('/user/login')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(200);

                expect(response.body).toEqual({ message: 'success' });
              });
        })

        describe('Test GET /user/find/:id', () => {
            test('It should respond with 200 success + Content-Type = json containing a User like object.', async () => {
                const userData: User = {
                    email: 'to.find.test.tech@email.com',
                    password: 'to.find.test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);

                const responseFind = await request(app)
                    .get('/user/find/'+ response.body.id)
                    .expect('Content-Type', /json/)
                    .expect(200);

                expect(responseFind.body).toEqual(response.body);
              });
        
              test('It should respond with 404 not found when trying to find an id that does not exist.', async () => {
        
                const responseUpdate = await request(app)
                    .get('/user/find/this.id.should.not.exist')
                    .expect('Content-Type', /json/)
                    .expect(404);
        
                    expect(responseUpdate.body).toEqual({ error: 'user not found' });
              });
        })

        describe('Test GET /user/update/:id', () => {
            test('It should respond with 200 success + Content-Type = json with the updated user.', async () => {
                const userData: User = {
                    email: 'to.update.test.tech@email.com',
                    password: 'to.update.test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);
        
                const userToUpdate: User = response.body;
                userToUpdate.email = 'updated.test.tech@email.com';
                
                const responseUpdate = await request(app)
                    .put('/user/update/'+ userToUpdate.id)
                    .send(userToUpdate)
                    .expect('Content-Type', /json/)
                    .expect(200);
        
                    expect(responseUpdate.body.email).toEqual('updated.test.tech@email.com');
              });
            
            test('It should respond with 400 bad request when trying to update with a bad email format.', async () => {
                const userData: User = {
                    email: 'to.not.update.test.tech@email.com',
                    password: 'to.not.update.test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);
        
                const userToUpdate: User = response.body;
                userToUpdate.email = 'should.not.update.test.techemail.com';
                
                const responseUpdate = await request(app)
                    .put('/user/update/'+ userToUpdate.id)
                    .send(userToUpdate)
                    .expect('Content-Type', /json/)
                    .expect(400);
        
                    expect(responseUpdate.body).toEqual({ error: 'invalid email' })
              });
            
            test('It should respond with 400 bad request when trying to update with an email larger than 100 characters.', async () => {
                const userData: User = {
                    email: 'to.not.update.large.test.tech@email.com',
                    password: 'to.not.update.large.test.tech@123',
                    role: '2'
                };
                const response = await request(app)
                    .post('/user/add')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);
        
                const userToUpdate: User = response.body;
                let stringToRepeat: string = 'x'
                stringToRepeat = stringToRepeat.repeat(90)
                userToUpdate.email = `should.not.update.large.test.tech${ stringToRepeat }@email.com`;
                const responseUpdate = await request(app)
                    .put('/user/update/'+ userToUpdate.id)
                    .send(userToUpdate)
                    .expect('Content-Type', /json/)
                    .expect(400);

                    expect(responseUpdate.body).toEqual({ error: 'invalid email' })
              });
            
            test('It should respond with 404 when trying to update with a id that does not exist.', async () => {
                const userData: User = {
                    id: 'this.id.does.not.exist',
                    email: 'to.not.update.test.tech@email.com',
                    password: 'to.not.update.test.tech@123',
                    role: '2'
                };
                
                const responseUpdate = await request(app)
                    .put('/user/update/'+ userData.id)
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(404);

                    expect(responseUpdate.body).toEqual({ error: 'user not found' })
              });

              test('It should respond with 404 when trying to update with no id informed.', async () => {
                const userData: User = {
                    id: 'this.id.does.not.exist',
                    email: 'to.not.update.test.tech@email.com',
                    password: 'to.not.update.test.tech@123',
                    role: '2'
                };
                
                const responseUpdate = await request(app)
                    .put('/user/update/')
                    .send(userData)
                    .expect(404);

                    expect(responseUpdate.body).toEqual({ });
              });
        })

    })
}