import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  label: string
  subLabel: string,
  route: string
}

@Component({
  selector: 'app-side-menu-options',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  menuOption: MenuOptions[] = [
    {
      label: 'Weather',
      subLabel: '',
      route: 'weather'
    },

    {
      label: 'Users',
      subLabel: '',
      route: 'list-users'
    }
  ]
}
