import { Request, Response } from "express";
import { UserService } from "../../services/users/User.Service";
import { User } from "../../entities/User";

class UserController {
  constructor(private userService: UserService) {}

  async httpAddUser(req: Request, res: Response) {
    // try {
    //   const { userId, summary } = req.body;

    //   if (!this.checkUserId(userId))
    //     return res.status(400).json({ error: 'invalid userId' });
    //   if (!this.checkSummary(summary))
    //     return res.status(400).json({ error: 'invalid summary' });

    //   const task = await this.userService.add({ userId, summary });

    //   return res.status(201).json(task);
    // } catch (error: any) {
    //   console.error(`httpAddTask Error-> ${error}`);
    //   res.status(500).json({error: 'error attempting to add a task'});
    // } 
  }

  async httpListUsers(req: Request, res: Response) {
    // try {
    //   const taskList = await this.userService.list();
      
    //   return res.status(200).json(taskList);
    // } catch (error: any) {
    //   console.error(`httpListTasks Error-> ${error}`);
    //   res.status(500).json({error: 'error attempting to list tasks'});
    // }
  }

  async httpFindUserById(req: Request, res: Response) {
    // try {
    //   const id = req.params.id;
    //   if (!id)
    //     return res.status(400).json({ error: 'invalid id' });

    //   const taskExist = await this.userService.exist(id)
    //   if (!taskExist)
    //     return res.status(404).json({ error: 'task not found' });
    //   const foundTask = await this.userService.findById(id);

    //   return res.status(200).json(await this.userService.findById(id));
    // } catch (error: any) {
    //   console.error(`httpFindTaskById Error-> ${error}`);
    //   res.status(500).json({error: 'error attempting to find the task'});
    // }
  }

  async httpUpdateUser(req: Request, res: Response) {
    // try {
    //   const taskToUpdate: Task = req.body;
    //   const id = req.params.id;
    //   taskToUpdate.id = id;

    //   if (!this.checkUserId(taskToUpdate.userId!))
    //     return res.status(400).json({ error: 'invalid userId' });
    //   if (!this.checkSummary(taskToUpdate.summary))
    //     return res.status(400).json({ error: 'invalid summary' });

    //   const task = await this.userService.update(taskToUpdate);
      
    //   return res.status(200).json(task);
    // } catch (error: any) {
    //   if (error.message.includes('task not found')) 
    //     return res.status(404).json({ error: 'task not found' });
    
    //   console.error(`httpUpdateTask Error-> ${error}`);
    //   res.status(500).json({error: 'error attempting to update a task'});
    // }
  }

  checkEmail(email: string) {
    // try {
    //   // Size between 3 to 100
    //   const PWD_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    //   if (!userId)
    //       return false;
    //   if(PWD_REGEX.test(userId)) 
    //       return true; 
    
    //   return false;
    // } catch (error: any) {
    //   console.error(`checkUserId Error-> ${error}`);
    // } 
  }

  checkRole(role: string) {
    // try {
    //   // Matches any alphanumeric character or the specified symbols. 
    //   // Size between 3 to 100
    //   const PWD_REGEX = /^.{3,100}$/;
    //   if (!summary)
    //       return false;
    //   if(PWD_REGEX.test(summary)) 
    //       return true; 
    
    //   return false;
    // } catch (error: any) {
    //   console.error(`checkUserId Error-> ${error}`);
    // }  
  }
}

export { UserController };