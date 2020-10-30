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

  public saveUserData(user: IUserData, image?: IFile): Promise<DocumentReference> {
    // const userAuthData = { displayName: user.displayName, photoURL: user.photoURL, email: user.email };
    // this.authSvc.preSaveUserProfile(userAuthData, image);
    if (!this.authSvc.getUserID()) {
      console.error('User not logged! (or there is some problem with the ID)');
      return;
    }
    console.log('BEFORE SAVING ##############');
    const myUserDoc = this.userData.doc(this.authSvc.getUserID());
    console.log('BEFORE SAVING: ' + this.authSvc.getUserID() + ' ##############');
    const userTets = {
      id: this.store.createId(),
      uid: 'asdf',
      email: 'asdf@asdf.de',
      photoURL: 'asdf',
      displayName: 'test',
      firstName: 'Test',
      secondName: 'TEST',
    };
    console.log('BEFORE SAVING: get works ##############', userTets);

    return this.userData.add(userTets);
    /* if (myUserDoc.get()) {
      console.log('BEFORE SAVING: get works ##############');
      myUserDoc.update(user)
      .then(() => console.log('User UPDATED!'))
      .catch((err) => console.log('Error', err));
    } else {
      console.log('BEFORE SAVING: get DOESNT work ##############');
      myUserDoc.set(user)
      .then(() => console.log('User SETTED!'))
      .catch((err) => console.log('Error', err));
    }*/
  }

}
