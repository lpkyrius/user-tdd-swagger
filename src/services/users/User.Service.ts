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

}

export { UserService };