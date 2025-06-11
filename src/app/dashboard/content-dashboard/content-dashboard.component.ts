import { Component, OnDestroy, OnInit } from '@angular/core';

import { Task } from '../tasks/interface/tasks.interface';
import { TaskService } from '../tasks/service/tasks.service';
import { Country, WeatherResponse, WeatherService } from './service/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './content-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  weatherData!: WeatherResponse;
  tasks: Task[] = [];
  newTaskTitle = ''
  localTime: string = '';
  selectedCountryCode = 'MX';
  private intervalId: any;

  constructor(
    private weatherService: WeatherService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.weatherService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error('Error cargando países', err),
    });

    this.loadWeather(this.selectedCountryCode);
    this.loadTasks();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  loadWeather(code: string) {
    this.selectedCountryCode = code;
    this.weatherService.getWeatherByCountryCode(code).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.startClock(data.location.tz_id);
      },
      error: (err) => console.error('Error cargando clima', err)
    });
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

  startClock(tz: string) {
    if (this.intervalId) clearInterval(this.intervalId);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: tz
    };
    const formatter = new Intl.DateTimeFormat('default', options);

    const updateTime = () => {
      const now = new Date();
      this.localTime = formatter.format(now);
    };

    updateTime();
    this.intervalId = setInterval(updateTime, 1000);
  }

  getFlagEmoji(code: string): string {
    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }
}
