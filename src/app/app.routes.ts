import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { RegisterComponent } from './auth/register/register.component';
import { CountriesComponent } from './dashboard/countries/countries.component';
import { ListUsersComponent } from './dashboard/list-users/page/list-users.component';
// import { TaskListComponent } from './dashboard/tasks/page/task-list.component';
import { DashboardComponent } from './dashboard/content-dashboard/content-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  // { path: 'dashboard/tasks', component: TaskListComponent },

  { path: 'dashboard/countries', component: CountriesComponent },

  { path: 'dashboard/list-users', component: ListUsersComponent },

  { path: 'dashboard/content', component: DashboardComponent },
];
