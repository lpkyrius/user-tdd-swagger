import { expect, describe, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import * as fs from 'fs';
import path from 'path';
import { mockedUsers } from './mockedUsers';
import { User } from '../../entities/User';
import { ManageUserTestFile } from '../../repository/in-memory/users/ManageUserTestFile';

// Mock console.log and console.error globally for the entire test suite
// So we keep a clear console when tests should return error 
// global.console.log = jest.fn();
// global.console.error = jest.fn();

describe('#E2E tests for tasks.', () => {
    describe('Test POST /user/add', () => {
        test.todo('It should respond with 200 success + Content-Type = json.')
        test.todo('It should respond with 400 bad request + Content-Type = json for bad formatted email.')
        test.todo('It should respond with 400 bad request + Content-Type = json for bad formatted role.')
        test.todo('It should respond with 400 bad request + Content-Type = json for bad formatted task.')
    })

    describe('Test GET /user/list', () => {
        test.todo('It should respond with 200 success + Content-Type = json containing a Task like object.')
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