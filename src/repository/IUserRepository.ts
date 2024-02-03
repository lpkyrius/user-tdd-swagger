import { User } from "../entities/User";

export interface IUserRepository {
  add(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  findUserById(id: string): Promise<User>;
  list(): Promise<User[]>;
}