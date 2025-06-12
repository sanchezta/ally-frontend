import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export default class SideMenuComponent { }
