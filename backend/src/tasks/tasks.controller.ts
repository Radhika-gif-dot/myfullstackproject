import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { TasksService } from './tasks.service';
import { Task } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createTask(@Body() task: CreateTaskDto, @Request() req): Promise<Task> {
    return this.tasksService.createTask({ ...task, user: req.user.userId });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getTasks(@Request() req): Promise<Task[]> {
    return this.tasksService.getTasks(req.user.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateTask(
    @Param('id') id: string,
    @Body() updates: UpdateTaskDto,
    @Request() req,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updates, req.user.userId);
  }

  @Put('status/:id')
@UseGuards(AuthGuard('jwt'))
async updateTaskStatus(
  @Param('id') id: string,
  @Body('status') status: string, 
): Promise<Task> {
  if (!['To Do', 'In Progress', 'Done'].includes(status)) {
    throw new BadRequestException('Invalid status value');
  }
  return this.tasksService.updateTaskStatus(id, status);
}


  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteTask(@Param('id') id: string, @Request() req): Promise<Task> {
    return this.tasksService.deleteTask(id, req.user.userId);
  }
}
