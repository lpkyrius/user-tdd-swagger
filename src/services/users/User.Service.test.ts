import { expect, describe, beforeAll } from '@jest/globals';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repository/in-memory/IUserRepository';
import { UserService } from './User.Service';
import { UserRepositoryInMemory } from '../../repository/in-memory/users/UserRepositoryInMemory';

describe('#UserService', () =>{

    let userRepository: IUserRepository;
    let userService: UserService;
    const userStructure = expect.arrayContaining([
        expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            created_at: expect.any(String),
        }),
    ]);

    beforeAll(() => {
        userRepository = new UserRepositoryInMemory();
        userService = new UserService(userRepository);
        
    });
    
    describe('#UserExist', () => {
        it('should return false when check if a non-existent user exists', async () => {
            const result = await userService.exist('this.id.does.not.exist');

            expect(result).toBeFalsy();
        })
    })

    describe('#CreateUser', () => {
        it('should be able to create a new user and confirm it exists', async () => {
            const user: User = {
                'email': 'peter.tech@gmail.com',
                'role': '2'
            };
            const resultUser = await userService.add(user);
            const result = await userService.exist(resultUser.id!);

            expect(result).toBeTruthy();
            expect(user.email).toEqual('peter.tech@gmail.com')
        })
    })

    describe('#ListUser', () => {
        let users: User[]; 

        it('should receive an array of tasks', async () => {
            users = await userService.list();

            expect(users).toBeInstanceOf(Array);
            expect(users).toEqual(userStructure);
        })
    })

    describe('#UpdateUser', () => {
        it.todo('should be able to update an existent user')
    })

    describe('#DeleteUser', () => {
        it.todo('should be able to delete an existent user')
    })
 
})
