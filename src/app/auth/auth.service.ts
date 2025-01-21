import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserRegistration, RegistrationResponse } from './models/auth.interfaces';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router} from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GoogleAuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/app';
import { FacebookAuthProvider } from 'firebase/auth';
import { OAuthProvider } from 'firebase/auth';

interface User {
  uid?: string;
  name: string;
  email: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  setUserData(user: any) {
    const userKey = this.firestore.createId(); // Genera un ID único
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      createdAt: new Date()
    };
    
    return this.firestore.collection('users').add(userData);
  }
  //Método para login con email y contraseña
  loginWithEmailPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Método para login
  login(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => user !== null)
    );
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  registerUser(userRegistration: UserRegistration): Observable<RegistrationResponse> {
    return from(
      this.auth.createUserWithEmailAndPassword(
        userRegistration.email,
        userRegistration.password
      )
    ).pipe(
      switchMap(async (userCredential) => {
        await this.setUserData({
          uid: userCredential.user?.uid,
          email: userCredential.user?.email,
          displayName: userRegistration.displayName
        });
        
        return {
          success: true,
          user: userCredential.user
        };
      })
    );
  }

  async signInWithGoogle(): Promise<RegistrationResponse> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.auth.signInWithPopup(provider);
      
      await this.setUserData({
        uid: result.user?.uid,
        email: result.user?.email,
        displayName: result.user?.displayName
      });
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Error en signInWithGoogle:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión con Google'
      };
    }
  }

  async signInWithFacebook(): Promise<RegistrationResponse> {
    try {
      const provider = new FacebookAuthProvider();
      const result = await this.auth.signInWithPopup(provider);
      
      await this.setUserData({
        uid: result.user?.uid,
        email: result.user?.email,
        displayName: result.user?.displayName
      });
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Error en signInWithFacebook:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión con Facebook'
      };
    }
  }

  async signInWithApple(): Promise<RegistrationResponse> {
    try {
      const provider = new OAuthProvider('apple.com');
      const result = await this.auth.signInWithPopup(provider);
      
      await this.setUserData({
        uid: result.user?.uid,
        email: result.user?.email,
        displayName: result.user?.displayName
      });
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error('Error en signInWithApple:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión con Apple'
      };
    }
  }
}
