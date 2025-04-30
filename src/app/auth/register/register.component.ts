// register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h2 class="text-center mb-4">Registro</h2>
              
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    formControlName="name"
                    [class.is-invalid]="name?.invalid && name?.touched"
                    placeholder="Tu nombre">
                  <div class="invalid-feedback" *ngIf="name?.errors?.['required']">
                    El nombre es requerido
                  </div>
                  <div class="invalid-feedback" *ngIf="name?.errors?.['pattern']">
                    El nombre solo puede contener letras y espacios
                  </div>
                </div>

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
                  <div class="invalid-feedback" *ngIf="password?.errors?.['minlength']">
                    La contraseña debe tener al menos 6 caracteres
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="registerForm.invalid || isLoading">
                    {{ isLoading ? 'Registrando...' : 'Registrarse' }}
                  </button>
                </div>
              </form>

              <div class="text-center mt-3">
                <button 
                  class="btn btn-outline-primary"
                  (click)="registerWithGoogle()"
                  [disabled]="isLoading">
                  <i class="bi bi-google"></i> Registrarse con Google
                </button>
              </div>

              <div class="text-center mt-3">
                <a routerLink="/login">¿Ya tienes cuenta? Inicia sesión</a>
              </div>

              <div class="alert alert-danger mt-3" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="alert alert-success mt-3" *ngIf="successMessage">
                {{ successMessage }}
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      this.authService.registerWithEmail(
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('name')?.value
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = '¡Registro exitoso! Redirigiendo...';
            setTimeout(() => {
              this.router.navigate(['/map']);
            }, 1500);
          } else {
            this.errorMessage = response.message || 'Error en el registro';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error en el registro. Por favor, intenta de nuevo.';
          this.isLoading = false;
        }
      });
    }
  }

  registerWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.authService.signInWithGoogle().subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = '¡Registro exitoso! Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/start']);
          }, 1500);
        } else {
          this.errorMessage = response.message || 'Error en el registro con Google';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error en el registro con Google';
        this.isLoading = false;
      }
    });
  }
}