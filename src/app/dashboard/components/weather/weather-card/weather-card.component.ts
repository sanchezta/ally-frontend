import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html',
})
export class WeatherCardComponent {
  @Input() current!: {
    temp_c: number;
    condition: {
      icon: string;
      text: string;
    };
  };
}
