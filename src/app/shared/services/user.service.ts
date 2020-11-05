import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IFile } from '../models/file.interface';
import { IUserData } from '../models/user.interface';
import { AuthService } from './auth.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: AngularFirestoreCollection<IUserData>;

  constructor(
    private store: AngularFirestore,
    private authSvc: AuthService,
    private imageSvc: ImageService,
  ) {
    this.userData = store.collection<IUserData>('users');
  }

  public getCurrentUser(): Observable<IUserData> {
    return this.userData.doc<IUserData>(this.authSvc.getUserID()).valueChanges();
  }

  public getAllUsers(): Observable<IUserData[]> {
    return this.userData.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IUserData;
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
      ),
    );
  }

  public saveUserData(user: IUserData, image?: IFile): void {
    if (!this.authSvc.getUserID()) {
      console.error('User not logged! (or there is some problem with the ID)');
      return;
    }

    if (image) {
      const imageName = `images/${this.authSvc.getUserID()}`;
      this.imageSvc.uploadImage(image, imageName).snapshotChanges().pipe(
        finalize(() => {
          this.imageSvc.downloadURL(imageName).subscribe((urlImage) => {
            const userAuthData = {
              displayName: user.displayName,
              photoURL: urlImage,
              email: user.email, // TODO: email has to be saved in authSrv
            };
            this.authSvc.saveUserProfile(userAuthData);
            user.photoURL = urlImage;
            this.saveUser(user);
          });
        }),
      ).subscribe();
    } else {
      user.photoURL = this.authSvc.getUserImage();
      const userAuthData = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email, // TODO: email has to be saved in authSrv
      };
      this.authSvc.saveUserProfile(userAuthData);
      this.saveUser(user);
    }

  }

  private saveUser(user: IUserData): void {
    this.userData.doc(this.authSvc.getUserID()).set(user).then(() => {
      console.log('Documento creado exitósamente!');
    })
    .catch((err) => console.log('Error on saving:', err));
  }

}
