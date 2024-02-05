import { expect, describe, beforeAll } from '@jest/globals';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repository/in-memory/IUserRepository';
import { UserService } from './User.Service';
import { UserRepositoryInMemory } from '../../repository/in-memory/users/UserRepositoryInMemory';


describe('#UserService', () =>{

    let userRepository: IUserRepository;
    let userService: UserService;

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
                "email": "peter.tech@gmail.com",
                "role": "2"
            }

            const result = await userService.add(user);

            console.log(result)
        })
    })

    describe('#ListUser', () => {
        it.todo('should receive an array of users')
    })

    describe('#UpdateUser', () => {
        it.todo('should be able to update an existent user')
    })

    describe('#DeleteUser', () => {
        it.todo('should be able to delete an existent user')
    })
 
})
