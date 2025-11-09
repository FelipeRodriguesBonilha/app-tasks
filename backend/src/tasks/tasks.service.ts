import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) { }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(title: string) {
    const task = this.repo.create({ title });
    return this.repo.save(task);
  }

  async toggle(id: number) {
    const task = await this.repo.findOneBy({ id });
    if (!task) return null;
    task.completed = !task.completed;
    return this.repo.save(task);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}