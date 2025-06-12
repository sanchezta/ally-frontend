import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/components/side-menu/side-menu.component'),
    children: [
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full'
      },
      {
        path: 'weather',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/page/weather-page/weather-page.component')
      },
      {
        path: 'list-users',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/page/list-users-page/list-users-page.component')
      }
    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
  },

  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component')
  },

  {
    path: '**',
    redirectTo: 'weather'
  }
];
