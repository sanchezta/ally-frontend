import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../auth/service/auth.service';

interface MenuOptions {
  label: string;
  subLabel: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
    },
    {
      label: 'Cerrar sesión',
      subLabel: '',
      action: () => this.logout()
    }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
