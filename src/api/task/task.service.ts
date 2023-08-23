import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { ReqCreateTask } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(skip: number, take: number) {
    if (!skip) skip = 1;
    if (!take) take = 10;
    const task = await this.taskRepository.find({
      skip,
      take,
    });
    return task;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    if (!task) throw new NotFoundException('Task Not Found');
    return task;
  }

  async createTask(body: ReqCreateTask) {
    const task = this.taskRepository.create({ ...body });
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, body: ReqCreateTask): Promise<TaskEntity> {
    const updatedTask = await this.taskRepository.preload({
      id,
      ...body,
    });
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.preload({
      id: id,
      deletedAt: new Date(),
    });
    if (!task) throw new NotFoundException('Task Not Found');
    return this.taskRepository.save(task);
  }
}
