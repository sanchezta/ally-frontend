import { Component } from '@angular/core';
import { Country, WeatherResponse, WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from '../../components/tasks/tasks.component';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TasksComponent],
  templateUrl: './weather-page.component.html',
})
export default class WeatherPageComponent {

  countries: Country[] = [];
  weatherData!: WeatherResponse;
  localTime: string = '';
  selectedCountryCode = 'MX';
  private intervalId: any;

  constructor(
    private weatherService: WeatherService,
  ) { }

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
}
