// import { Component, OnInit } from '@angular/core';
// import { TaskService } from '../service/tasks.service';
// import { Task } from '../interface/tasks.interface';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
// })
// export class TaskListComponent implements OnInit {
//   tasks: Task[] = [];
//   newTaskTitle = '';

//   constructor(private taskService: TaskService) { }

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks(): void {
//     this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
//   }

//   createTask(): void {
//     if (!this.newTaskTitle.trim()) return;

//     const task: Partial<Task> = {
//       title: this.newTaskTitle,
//       completed: false
//     };

//     this.taskService.addTask(task).subscribe(newTask => {
//       this.tasks.push(newTask);
//       this.newTaskTitle = '';
//     });
//   }

//   updateTask(task: Task): void {
//     this.taskService.updateTask(task).subscribe();
//   }

//   deleteTask(id: number): void {
//     this.taskService.deleteTask(id).subscribe(() => {
//       this.tasks = this.tasks.filter(t => t.id !== id);
//     });
//   }
// }
