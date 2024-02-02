import { TaskService } from "../services/TaskService";
import { TaskController } from "../routes/tasks/TaskController";
import { TasksRepositoryInMemory } from "../repository/in-memory/TasksRepositoryInMemory";

export default class TaskFactory {
  static async createInstance() {
    const taskRepository = new TasksRepositoryInMemory();
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);
  
    return taskController;
  }
}