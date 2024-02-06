import { Request, Response } from "express";
import { UserService } from "../../services/users/User.Service";
import { User } from "../../entities/User";
import { UserRole } from "../../repository/in-memory/UserRole";
class UserController {
  constructor(private userService: UserService) {}

  async httpAddUser(req: Request, res: Response) {
    try {
      const { email, role } = req.body;
      if (!this.checkEmail(email))
        return res.status(400).json({ error: 'invalid email' });
      if (!this.checkRole(role))
        return res.status(400).json({ error: 'invalid role' });

      const user = await this.userService.add({ email, role });
      
      return res.status(201).json(user);
    } catch (error: any) {
      console.error(`httpAddUser Error-> ${error}`);
      res.status(500).json({error: 'error attempting to add an user'});
    } 
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

  checkEmail(email: any) {
    try {
      if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) 
        return false; 
      if (email.length < 3 || email.length > 100)
          return false;

      return true; 
    } catch (error: any) {
      console.error(`checkEmail Error-> ${error}`);
    } 
  }

  checkRole(role: any) {
    try {
      // Matches any alphanumeric character or the specified symbols. 
      // Size between 3 to 100
      if (!role)
          return false;
      if(!Object.values(UserRole).includes(role)) 
          return false; 
  
      return true;
    } catch (error: any) {
      console.error(`checkRole Error-> ${error}`);
    }  
  }
}

export { UserController };