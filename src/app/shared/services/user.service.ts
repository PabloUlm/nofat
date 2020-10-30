import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFile } from '../models/file.interface';
import { IUserData } from '../models/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: AngularFirestoreCollection<IUserData>;

  constructor(private store: AngularFirestore, private authSvc: AuthService) {
    this.userData = store.collection<IUserData>('users');
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

  public saveUserData(user: IUserData, image?: IFile): Promise<void> {
    const userAuthData = { displayName: user.displayName, photoURL: user.photoURL, email: user.email };
    this.authSvc.preSaveUserProfile(userAuthData, image);

    if (!this.authSvc.getUserID()) {
      console.error('User not logged! (or there is some problem with the ID)');
      return;
    }

    return this.userData.doc(this.authSvc.getUserID()).set(user);
  }

}
