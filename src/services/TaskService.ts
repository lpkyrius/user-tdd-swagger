import { Task } from "../entities/Task";
import { ITaskRepository } from "../repository/ITaskRepository"

interface IAddTaskRequest {
  userId: string;
  summary: string;
};
interface IEditTaskRequest {
  id: string;
  summary: string;
};
class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async add({ userId, summary }: IAddTaskRequest) {
    const taskCreate = { userId, summary };
    return await this.taskRepository.add(taskCreate);
  }

  async update(taskToUpdate: Task): Promise<Task> {
      return await this.taskRepository.update(taskToUpdate);
  }

  async delete(id: string): Promise<boolean> {
    return await this.taskRepository.delete(id);
  }

  async list(): Promise<Task[]> {
    return await this.taskRepository.list();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskRepository.findTaskById(id);
  }

  async exist(id: string): Promise<boolean> {
    return await this.taskRepository.exists(id);
  }

}

export { 
  TaskService,
 };