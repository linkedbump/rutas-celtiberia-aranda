import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async loginWithGoogle() {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  onSubmit(): void {
    if (this.loginForm?.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const credentials = {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || ''
      };

      this.authService.loginWithEmailPassword(credentials.email, credentials.password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error: any) => {
          switch(error.code) {
            case 'auth/invalid-credential':
              this.errorMessage = 'El correo electrónico o la contraseña son incorrectos';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'No existe una cuenta con este correo electrónico';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'La contraseña es incorrecta';
              break;
            case 'auth/too-many-requests':
              this.errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo más tarde';
              break;
            default:
              this.errorMessage = 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo de nuevo';
          }
          console.error('Error durante el login:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}