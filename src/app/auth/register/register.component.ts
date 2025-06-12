import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export default class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get f() {
    return this.registerForm.controls;
  }

  get passwordsDontMatch(): boolean {
    return this.f.password.value !== this.f.confirmPassword.value;
  }

  onSubmit() {
    if (this.registerForm.invalid || this.passwordsDontMatch) return;

    const name = this.f.name.value ?? '';
    const email = this.f.email.value ?? '';
    const password = this.f.password.value ?? '';

    this.authService.register({ name, email, password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/weather']);
      },
      error: () => {
        this.errorMessage = 'Error al registrar usuario';
      }
    });
  }
}
