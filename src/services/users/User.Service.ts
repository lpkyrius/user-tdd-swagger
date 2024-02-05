import { User } from '../../entities/User';
import { IUserRepository } from '../../repository/in-memory/IUserRepository';

interface IAddUserRequest {
    email: string;
    role: string;
  };

class UserService {

    constructor(private userRepository: IUserRepository) {}

    async exist(id: string): Promise<boolean> {
        return await this.userRepository.exists(id);
    }

    async add({ email, role }: IAddUserRequest) {
        return await this.userRepository.add({ email, role });
    }

    async update(userToUpdate: User): Promise<User> {
        return await this.userRepository.update(userToUpdate);
    }

    async delete(id: string): Promise<boolean> {
        return await this.userRepository.delete(id);
    }

    async list(): Promise<User[]> {
        return await this.userRepository.list();
    }

}

export { UserService };