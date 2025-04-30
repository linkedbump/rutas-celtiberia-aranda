import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h2 class="text-center mb-4">Iniciar Sesión</h2>
              
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    formControlName="email"
                    [class.is-invalid]="email?.invalid && email?.touched"
                    placeholder="ejemplo@correo.com">
                  <div class="invalid-feedback" *ngIf="email?.errors?.['required']">
                    El email es requerido
                  </div>
                  <div class="invalid-feedback" *ngIf="email?.errors?.['email']">
                    Por favor, introduce un email válido
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    formControlName="password"
                    [class.is-invalid]="password?.invalid && password?.touched"
                    placeholder="••••••••">
                  <div class="invalid-feedback" *ngIf="password?.errors?.['required']">
                    La contraseña es requerida
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || isLoading">
                    {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                  </button>
                </div>
              </form>

              <div class="text-center mt-3">
                <button 
                  class="btn btn-outline-primary"
                  (click)="loginWithGoogle()"
                  [disabled]="isLoading">
                  <i class="bi bi-google"></i> Iniciar sesión con Google
                </button>
              </div>

              <div class="text-center mt-3">
                <a routerLink="/register">¿No tienes cuenta? Regístrate</a>
              </div>

              <div class="alert alert-danger mt-3" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .btn-primary {
      background-color: var(--primary-color);
      border-color: #ff8a91;
    }
    .btn-primary:hover {
      background-color: #930010;
      border-color: #ff8a91;
    }
    .btn-outline-primary {
      color: #ff8a91,
      border-color: #var(--primary-color);
    }
    .btn-outline-primary:hover {
      background-color: var(--primary-color);
      color: white;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/start']);
          } else {
            this.errorMessage = response.message || 'Error al iniciar sesión';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          this.isLoading = false;
        }
      });
    }
  }

  loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.signInWithGoogle().subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/start']);
        } else {
          this.errorMessage = response.message || 'Error al iniciar sesión con Google';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al iniciar sesión con Google';
        this.isLoading = false;
      }
    });
  }
}
