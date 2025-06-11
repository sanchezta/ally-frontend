import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../services/user.service';
import { User, UserApiResponse } from '../interface/list-users.interface';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 5;
  nameFilter: string = '';
  emailFilter: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.limit, this.nameFilter, this.emailFilter).subscribe({
      next: (response: UserApiResponse) => {
        this.users = response.data;
        this.filteredUsers = [...this.users];
        this.totalPages = response.lastPage;
      },
      error: (err: any) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}
