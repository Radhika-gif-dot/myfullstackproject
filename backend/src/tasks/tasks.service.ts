import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async createTask(task: Partial<Task>): Promise<Task> {
    try {
      const newTask = new this.taskModel(task);
      return await newTask.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException(messages.join(', '));
      }
      throw error;
    }
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async updateTask(id: string, updates: Partial<Task>, userId: string): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true, runValidators: true },
    ).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTaskStatus(id: string, status: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOneAndDelete({ _id: id, user: userId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
