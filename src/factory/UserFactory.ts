
import { UserService } from "../services/users/User.Service";
// UserController
import { UserRepositoryInMemory } from "../repository/in-memory/users/UserRepositoryInMemory";

export default class UserFactory {
  static async createInstance() {
    const userRepository = new UserRepositoryInMemory();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
  
    return userController;
  }
}