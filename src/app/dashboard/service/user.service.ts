import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { UserApiResponse } from '../interface/list-users.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(
    page: number = 1,
    limit: number = 5,
    name?: string,
    email?: string
  ): Observable<UserApiResponse> {
    const params: any = {
      page: page.toString(),
      limit: limit.toString(),
    };
    if (name) params.name = name;
    if (email) params.email = email;
    return this.http.get<UserApiResponse>(this.API_URL, { params });
  }
}
