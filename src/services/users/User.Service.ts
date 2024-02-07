import { User } from '../../entities/User';
import { IUserRepository } from '../../repository/in-memory/IUserRepository';
import { Cryptography } from '../Cryptography/Cryptography.Service';
interface IAddUserRequest {
    email: string;
    password: string;
    role: string;
};
interface ILoginUserRequest {
    email: string;
    password: string;
};

class UserService {

    constructor(private userRepository: IUserRepository) {}

    async exist(id: string): Promise<boolean> {
        return await this.userRepository.exists(id);
    }

    async emailExists(email: string): Promise<boolean> {
        return await this.userRepository.emailExists(email);
    }

    async add({ email, password, role }: IAddUserRequest) {
        const crypto = new Cryptography();
        password = await crypto.encrypt(password);
        return await this.userRepository.add({ email, password, role });
    }

    async login({ email, password }: ILoginUserRequest) {
        const user: User = await this.userRepository.findUserByEmail(email)
        const crypto = new Cryptography();
        const loginSuccess: boolean = await crypto.decrypt(password, user.password);

        return loginSuccess;
    }

    async update(userToUpdate: User): Promise<User> {
        return await this.userRepository.update(userToUpdate);
    }

    async delete(id: string): Promise<boolean> {
        return await this.userRepository.delete(id);
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findUserById(id);
    }

}

export { UserService };