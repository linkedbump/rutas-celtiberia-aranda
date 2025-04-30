import { Injectable, Inject } from '@angular/core';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { doc, getDoc, updateDoc, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AppUser } from '../auth/models/user.interface';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../firebase.tokens';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(FIREBASE_AUTH) private auth: Auth,
    @Inject(FIREBASE_FIRESTORE) private firestore: Firestore
  ) {
    console.log('UserService constructor');
  }

  getUserProfile(): Observable<AppUser | null> {
    console.log('getUserProfile llamado');
    return new Observable<AppUser | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, async (user) => {
        if (!user) {
          observer.next(null);
          observer.complete();
        } else {
          const userRef = doc(this.firestore, `users/${user.uid}`);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data() as AppUser;
            observer.next({
              ...userData,
              uid: user.uid,
              email: user.email!
            });
          } else {
            // Fallback si no existe documento
            const fallbackUser: AppUser = {
              uid: user.uid,
              email: user.email!,
              name: user.displayName || 'Usuario sin perfil',
              createdAt: new Date(),
              avatar: 'Triskel.png', 
            };
            observer.next(fallbackUser);
          }
          observer.complete();
        }
      });

      return () => unsubscribe();
    });
  }

  updateAvatar(uid: string, avatar: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return updateDoc(userRef, { avatar });
  }
}
