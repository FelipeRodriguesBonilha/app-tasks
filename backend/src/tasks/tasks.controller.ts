import { Controller, Get, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body('title') title: string) {
    return this.service.create(title);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: number) {
    return this.service.toggle(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}