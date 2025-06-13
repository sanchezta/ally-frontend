import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-available-countries-card',
    imports: [CommonModule],
    templateUrl: './available-countries-card.component.html'
})
export class AvailableCountriesCardComponent {

  @Input() countries!: { code: string; name: string }[];
  @Input() getFlagEmoji!: (code: string) => string;
  @Output() countrySelected = new EventEmitter<string>();

  selectCountry(code: string) {
    this.countrySelected.emit(code);
  }
}
