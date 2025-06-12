import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { WeatherResponse } from '../interface/wather.interface';

export interface Country {
  name: string;
  code: string;
  capital: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_URL = `${environment.apiUrl}/weather`;

  constructor(private http: HttpClient) { }

  /** Clima del país por código (MX, JP, ES, etc.) */
  getWeatherByCountryCode(code: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.API_URL}/${code}/weather`);
  }

  /** Lista de países disponibles */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.API_URL);
  }
}
