import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environment/environment';
import { UserApiResponse } from '../interface/list-users.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }
  /**
 * Retrieves a list of users with optional pagination and filters.
 * @param page Page number for pagination (default is 1).
 * @param limit Maximum number of users per page (default is 5).
 * @param name Optional filter by user name.
 * @param email Optional filter by user email.
 * @returns Observable that emits the API response with the users.
 */
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
