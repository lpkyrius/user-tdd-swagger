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

    describe('#UserEmailExist', () => {
        it('should return true when check if an existent user email exists', async () => {
            const user: User = {
                email: 'exist.tech@email.com',
                password: 'exist.tech@123',
                role: '2'
            };
            const addedUser = await userService.add(user);
            const result = await userService.emailExists(addedUser.email);

            expect(result).toBeTruthy();
        })

        it('should return false when check if a non-existent user exists', async () => {
            const result = await userService.emailExists('this.id.does.not.exist');

            expect(result).toBeFalsy();
        })
    })

    describe('#CreateUser', () => {
        it('should be able to create a new user and confirm it exists', async () => {
            const user: User = {
                email: 'peter.tech@email.com',
                password: 'peter.tech@123',
                role: '2'
            };
            const addedUser = await userService.add(user);
            const result = await userService.exist(addedUser.id!);

            expect(addedUser).toHaveProperty('id');
            expect(result).toBeTruthy();
            expect(user.email).toEqual('peter.tech@email.com')
        })
    })

    describe('#LoginUser', () => {
        it('should be able to log in with valid user and password', async () => {
            const userData = {
                email: 'mary.tech@email.com',
                password: 'mary.tech@123'
            };
            const result = await userService.login(userData);

            expect(result).toBeTruthy();
        })
        
        it('should NOT be able to log in with invalid password', async () => {
            const noPasswordUser = {
                email: 'mary.tech@email.com',
                password: ''
            };
            const result = await userService.login(noPasswordUser);

            expect(result).toBeFalsy();
        })

        it('should throw an error when trying to log in with invalid user', async () => {
            const userInvalid = {
                email: 'i.do.not.exist@email.com',
                password: 'mary.tech@123'
            };
            await expect(async () => {
                const loginIssue: boolean = await userService.login(userInvalid);
            }).rejects.toThrow('email not found');
        })

        it('should throw an error when trying to log in with invalid user email', async () => {
            const userInvalid = {
                email: '',
                password: ''
            };
            await expect(async () => {
                const loginIssue: boolean = await userService.login(userInvalid);
            }).rejects.toThrow('email not found');
        })
    })

    describe('#Find User', () => {
        let user: User;
    
        it('should find an existent user', async () => {
            let user: User, result: User; 
            const userData = {
                email: 'manager.to.find@email.com',
                password: 'manager.to.find@123',
                role: '1',
            };

            user = await userService.add(userData);
            const userFound: User = await userService.findById(user.id!);
    
          expect(userFound.email).toEqual('manager.to.find@email.com')
        });
    
        it('should throw an error when trying to find a non-existing user on UserService', async () => {
          await expect(async () => {
            const findUserError: User = await userService.findById('this.id.should.not.exist');
          }).rejects.toThrow('Id not found');
        });
      });

    describe('#UpdateUser', () => {
        it('should be able to update an existent user', async () => {
            let user: User, result: User; 
            const userData = {
                email: 'manager.to.update@email.com',
                password: 'manager.to.update@123',
                role: '1',
            };

            user = await userService.add(userData);

            let updatedUser: User = Object.assign({}, user);
            updatedUser.email = 'manager.updated@email.com';

            result = await userService.update(updatedUser);

            expect(result.email).toBe('manager.updated@email.com');
        })

        it('should throw an error when updating a non-existing user on UserService', async () => {
        const userError: User = {
            id: 'this.id.should.not.exist',
            email: 'this.user.does.not.exist@email.com',
            password: 'this.user.does.not.exist@123',
            role: '1',
        };
        await expect(async () => {
            const updatedUserError: User = await userService.update(userError);
        }).rejects.toThrow('user not found');
        });
    })

    describe('#DeleteUser', () => {
        it('should be able to delete an existent user', async () => {
            const userData = {
                email: 'manager.to.create@email.com',
                password: 'manager.to.create@123',
                role: '1',
            };
        
            const user: User = await userService.add(userData);
            const existNewUser: boolean = await userService.exist(user.id!);
    
            const userDeleted = await userService.delete(user.id!);
            const existAfterDelete: boolean = await userService.exist(user.id!);
    
            expect(userDeleted).toBeTruthy;
            expect(existNewUser).toBe(true);
            expect(existAfterDelete).toBe(false);
        });
        
        it('should return false when deleting a non-existing user on UserService', async () => {
            const testDel = async function () {
                return await userService.delete('this.id.should.not.exist');
            }
            expect(await testDel()).toBeFalsy();
        });
        
    });
    
});
