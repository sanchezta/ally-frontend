import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environment/environment';
import { LoginPayload, RegisterPayload } from '../interface/auth-payloads.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private API_URL = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient) { }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, payload).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    this.http.post(`${this.API_URL}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
      },
      error: () => {
        localStorage.removeItem('token');
      }
    });
  }
}
