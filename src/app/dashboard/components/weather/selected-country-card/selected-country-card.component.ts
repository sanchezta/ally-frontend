import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-country-card',
  standalone: true,
  imports: [],
  templateUrl: './selected-country-card.component.html',
})
export class SelectedCountryCardComponent {

  @Input() location!: {
    country: string;
    name: string;
    region: string;
    lat: number;
    lon: number;
  };
}
