import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Serialize } from 'src/core/serialize.dto';
import { ReqCreateTask, ResGetTask } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Serialize(ResGetTask)
  @Get()
  async getTasks(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.taskService.getTasks(page, limit);
  }

  @Serialize(ResGetTask)
  @Get()
  async getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTask(id);
  }

  @Serialize()
  @Post()
  async createTask(@Body() body: ReqCreateTask) {
    return this.taskService.createTask(body);
  }

  @Serialize()
  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReqCreateTask,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Serialize()
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
