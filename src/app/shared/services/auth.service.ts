import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IFile } from '../models/file.interface';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  private filePath: string;

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;
  }

  public loginByEmail(user: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = user;

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public preSaveUserProfile(user: IUser, image?: IFile): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: IUser, image: IFile): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((urlImage) => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        }),
      ).subscribe();
  }

  private saveUserProfile(user: IUser): void {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
      .then(() => console.log('User updated!'))
      .catch((err) => console.log('Error', err));
  }
}
