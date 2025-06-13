import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserApiResponse } from '../../interface/list-users.interface';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-list-users-page',
    imports: [CommonModule, FormsModule],
    templateUrl: './list-users-page.component.html'
})
export default class ListUsersPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 5;
  searchQuery: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.limit, this.searchQuery).subscribe({
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

  applyFilter(): void {
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
