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
   * Obtiene una lista de usuarios con paginación y filtros opcionales.
   * @param page Número de página para la paginación (por defecto 1).
   * @param limit Número máximo de usuarios por página (por defecto 5).
   * @param name Filtro opcional por nombre de usuario.
   * @param email Filtro opcional por correo electrónico de usuario.
   * @returns Observable que emite la respuesta de la API con los usuarios.
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
