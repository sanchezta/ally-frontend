import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.API_URL}/login`, payload);
  }
}
