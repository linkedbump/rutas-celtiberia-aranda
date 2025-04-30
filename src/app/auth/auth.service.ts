// auth.service.ts
import { Injectable, Inject } from '@angular/core';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  Auth
} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../firebase.tokens';

interface AuthResponse {
  success: boolean;
  user?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(FIREBASE_AUTH) private auth: Auth,
    @Inject(FIREBASE_FIRESTORE) private firestore: Firestore,
    private router: Router
  ) {}

  // Registro con email y contraseña
  registerWithEmail(email: string, password: string, displayName: string): Observable<AuthResponse> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap(async (userCredential) => {
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
            
            // Guardar información adicional del usuario en Firestore
            const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
            await setDoc(userRef, {
              email,
              displayName,
              photoURL: userCredential.user.photoURL,
              createdAt: new Date().toISOString()
            });
          }
        }),
        map(userCredential => ({
          success: true,
          user: userCredential.user
        })),
        catchError(error => {
          console.error('Error en el registro:', error);
          return from([{
            success: false,
            message: this.getErrorMessage(error.code)
          }]);
        })
      );
  }

  // Iniciar sesión con email y contraseña
  login(email: string, password: string): Observable<AuthResponse> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        map(userCredential => ({
          success: true,
          user: userCredential.user
        })),
        catchError(error => {
          console.error('Error en el inicio de sesión:', error);
          return from([{
            success: false,
            message: this.getErrorMessage(error.code)
          }]);
        })
      );
  }

  // Iniciar sesión con Google
  signInWithGoogle(): Observable<AuthResponse> {
    const provider = new GoogleAuthProvider();
    
    return from(signInWithPopup(this.auth, provider))
      .pipe(
        tap(async (result) => {
          if (result.user) {
            const userRef = doc(this.firestore, `users/${result.user.uid}`);
            await setDoc(userRef, {
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              createdAt: new Date().toISOString()
            }, { merge: true });
          }
        }),
        map(result => ({
          success: true,
          user: result.user
        })),
        catchError(error => {
          console.error('Error en el inicio de sesión con Google:', error);
          return from([{
            success: false,
            message: this.getErrorMessage(error.code)
          }]);
        })
      );
  }

  // Cerrar sesión
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Recuperar contraseña
  resetPassword(email: string): Observable<AuthResponse> {
    return from(sendPasswordResetEmail(this.auth, email))
      .pipe(
        map(() => ({
          success: true,
          message: 'Se ha enviado un correo para restablecer tu contraseña'
        })),
        catchError(error => {
          console.error('Error al enviar el correo de recuperación:', error);
          return from([{
            success: false,
            message: this.getErrorMessage(error.code)
          }]);
        })
      );
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido';
      case 'auth/operation-not-allowed':
        return 'Esta operación no está permitida';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con este correo';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      default:
        return 'Ha ocurrido un error inesperado';
    }
  }
}