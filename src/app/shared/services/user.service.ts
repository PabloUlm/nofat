import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserData } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: AngularFirestoreCollection<IUserData>;

  constructor(private store: AngularFirestore) {
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

  // public saveUserData(user)

}
