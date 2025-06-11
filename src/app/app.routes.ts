import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { RegisterComponent } from './auth/register/register.component';
import { CountriesComponent } from './dashboard/countries/countries.component';
import { ListUsersComponent } from './dashboard/list-users/page/list-users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'dashboard/tasks', component: TasksComponent },

  { path: 'dashboard/countries', component: CountriesComponent },

  { path: 'dashboard/list-users', component: ListUsersComponent },

];
