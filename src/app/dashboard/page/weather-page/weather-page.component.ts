import { Component } from '@angular/core';
import { Country, WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { AvailableCountriesCardComponent } from '../../components/weather/available-countries-card/available-countries-card.component';
import { SelectedCountryCardComponent } from '../../components/weather/selected-country-card/selected-country-card.component';
import { WeatherCardComponent } from '../../components/weather/weather-card/weather-card.component';
import { WeatherResponse } from '../../interface/wather.interface';


@Component({
    selector: 'app-weather-page',
    imports: [
        CommonModule,
        FormsModule,
        TasksComponent,
        AvailableCountriesCardComponent,
        SelectedCountryCardComponent,
        WeatherCardComponent,
    ],
    templateUrl: './weather-page.component.html'
})
export default class WeatherPageComponent {
  countries: Country[] = [];
  weatherData!: WeatherResponse;
  localTime: string = '';
  localDate: string = ''; // <-- Añadido
  selectedCountryCode = 'MX';
  private intervalId: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error('Error cargando países', err),
    });

    this.loadWeather(this.selectedCountryCode);
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

  startClock(tz: string) {
    if (this.intervalId) clearInterval(this.intervalId);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: tz,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: tz,
    };

    const timeFormatter = new Intl.DateTimeFormat('default', timeOptions);
    const dateFormatter = new Intl.DateTimeFormat('es-ES', dateOptions);

    const updateTime = () => {
      const now = new Date();
      this.localTime = timeFormatter.format(now);
      this.localDate = dateFormatter.format(now); // <-- Formato en español
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
}
