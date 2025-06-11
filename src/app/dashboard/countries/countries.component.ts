import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [],
  templateUrl: './countries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent { }
