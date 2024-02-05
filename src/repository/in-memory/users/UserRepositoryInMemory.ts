import crypto from 'crypto';
import * as fs from 'fs';
import { User } from '../../../entities/User';
import { IUserRepository } from '../IUserRepository';
import { ManageUserTestFile } from './ManageUserTestFile';

class UserRepositoryInMemory {

    private readonly filePath: string;

    constructor() {
        const manageUserTestFile = new ManageUserTestFile();
        this.filePath = manageUserTestFile.getFile();
    }

    async add(user: User): Promise<User> {
        // const tasks = this.readTasksFromFile();
        // const newTask = { ...task, id: crypto.randomUUID(), created_at: new Date(new Date().toISOString()) };
        // tasks.push(newTask);
        // this.writeTasksToFile(tasks);
        // return newTask;
        return user;
    }

    async update(user: User): Promise<User> {
        // const tasks = this.readTasksFromFile();
        // const index = tasks.findIndex((t) => t.id === task.id);
        // if (index !== -1) {
        // tasks[index] = task;
        // this.writeTasksToFile(tasks);
        // return task;
        // }
        // throw new Error('task not found');
        return user;
    }

    async delete(id: string): Promise<boolean> {
        // const tasks = this.readTasksFromFile();
        // const initialLength = tasks.length;
        // const filteredTasks = tasks.filter((t) => t.id !== id);
        // if (filteredTasks.length !== initialLength) {
        // this.writeTasksToFile(filteredTasks);
        return true;
        // }
        // return false;
    }

    async exists(id: string): Promise<boolean> {
        const users = this.readUsersFromFile();
        
        return users.some((user) => user.id === id);
    }

    async list(): Promise<User[]> {
        return this.readUsersFromFile();
    }

    async findUserById(id: string): Promise<User> {
        // const tasks = this.readTasksFromFile();
        // const index = tasks.findIndex((t) => t.id === id);
        // if (index !== -1) {
        // return tasks[index];
        // }
        // throw new Error('Id not found');
        const user: User = {
            "id": "533b7681-b1c3-4244-8a37-423ae7a3d8ac",
            "email": "john@gmail.com",
            "role": "1",
            "created_at": new Date(new Date().toISOString())
          };
        return user;
    }

    private readUsersFromFile(): User[] {
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileData);
    }

    private writeUsersToFile(tasks: User[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }

}

export { UserRepositoryInMemory }