import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserRegistration, RegistrationResponse } from '../models/auth.interfaces';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['']
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  get nameControl() { return this.registerForm.get('name'); }
  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const userData: UserRegistration = {
        displayName: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };

      this.authService.registerUser(userData).subscribe({
        next: (response: RegistrationResponse) => {
          if (response.success) {
            this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        error: (error: any) => {
          this.loading = false;
          if (error.code === 'auth/email-already-in-use' || 
              error?.message?.includes('email-already-in-use')) {
            this.errorMessage = 'Este correo electrónico ya está registrado. Por favor, utiliza otro email.';
          } else {
            this.errorMessage = 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.';
          }
          console.error('Error durante el registro:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const response = await this.authService.signInWithGoogle();
      if (response.success) {
        this.successMessage = '¡Registro con Google exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // o la ruta que prefieras
        }, 2000);
      }
    } catch (error: any) {
      this.loading = false;
      this.errorMessage = 'Error al registrarse con Google. Por favor, inténtalo de nuevo.';
      console.error('Error con Google Sign-in:', error);
    } finally {
      this.loading = false;
    }
  }

  async signInWithFacebook(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const response = await this.authService.signInWithFacebook();
      if (response.success) {
        this.successMessage = '¡Registro con Facebook exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // o la ruta que prefieras
        }, 2000);
      }
    } catch (error: any) {
      this.loading = false;
      this.errorMessage = 'Error al registrarse con Facebook. Por favor, inténtalo de nuevo.';
      console.error('Error con Facebook Sign-in:', error);
    } finally {
      this.loading = false;
    }
  }

  async signInWithApple(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const response = await this.authService.signInWithApple();
      if (response.success) {
        this.successMessage = '¡Registro con Apple exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // o la ruta que prefieras
        }, 2000);
      }
    } catch (error: any) {
      this.loading = false;
      this.errorMessage = 'Error al registrarse con Apple. Por favor, inténtalo de nuevo.';
      console.error('Error con Apple Sign-in:', error);
    } finally {
      this.loading = false;
    }
  }
}
