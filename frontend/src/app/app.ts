import { Component } from '@angular/core';
import { Task, Tasks } from './services/tasks';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor(private tasksService: Tasks) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getAll().subscribe((data) => (this.tasks = data));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const task: Task = { title: this.newTaskTitle, description: '', completed: false };
    this.tasksService.create(task).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  toggleTask(id: number) {
    this.tasksService.toggle(id).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number) {
    this.tasksService.delete(id).subscribe(() => this.loadTasks());
  }
}
