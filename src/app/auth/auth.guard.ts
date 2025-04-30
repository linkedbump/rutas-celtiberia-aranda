import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FIREBASE_AUTH } from '../firebase.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_AUTH) private auth: Auth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/login']);
          observer.next(false);
        }
      });

      return () => unsubscribe();
    }).pipe(take(1));
  }
}