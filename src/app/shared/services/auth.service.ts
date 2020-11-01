import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<firebase.User>;
  private authState: any = null;

  constructor(
      private afAuth: AngularFireAuth,
    ) {
      this.user$ = afAuth.authState; // TODO: remove this, use only user service
      this.user$.subscribe( (authState) => {
        this.authState = authState;
      });
  }

  public loginByEmail(user: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = user;

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public getUserID(): string {
    return this.authState.uid;
  }

  public getUserImage(): string {
    return this.authState.photoURL;
  }

  public saveUserProfile(user: IUser): void {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
      .then(() => console.log('User updated!'))
      .catch((err) => console.log('Error', err));
  }
}
