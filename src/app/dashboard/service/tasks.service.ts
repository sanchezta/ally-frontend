import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  updateTask(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL}/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
