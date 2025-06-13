import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskService } from '../../service/tasks.service';

@Component({
    selector: 'app-tasks',
    imports: [CommonModule, FormsModule],
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error cargando tareas', err)
    });
  }

  markAsCompleted(task: Task) {
    if (task.completed) return;
    this.taskService.updateTask(task.id, { completed: true }).subscribe({
      next: (updatedTask) => {
        const i = this.tasks.findIndex(t => t.id === task.id);
        if (i > -1) this.tasks[i] = updatedTask;
      },
      error: (err) => console.error('Error completando tarea:', err),
    });
  }

  createTask() {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    this.taskService.createTask({ title, completed: false }).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.newTaskTitle = '';
      },
      error: (err) => console.error('Error creando tarea:', err),
    });
  }

  deleteTask(task: Task) {
    if (!confirm(`¿Eliminar la tarea "${task.title}"?`)) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: (err) => console.error('Error eliminando tarea:', err),
    });
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }
}
