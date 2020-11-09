import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IExercise } from '../models/exercise.interface';
import { ITraining } from '../models/training.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public trainingsCollection: AngularFirestoreCollection;
  public exercisesCollection: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) {
    this.trainingsCollection = store.collection('trainings');
    this.exercisesCollection = store.collection('exercises');
  }

  public getDefaultTraining(): Observable<any> { // Observable<ITraining> {
    return this.getTrainingById('default');
  }

  public getTrainingById(id: string): Observable<any> { // Observable<ITraining> {
    const exercise: IExercise = {
      id: 'test',
      description: 'bla',
    };
    const trainingDemo: ITraining = {exercises: [exercise]};

    return this.store.doc('trainings/default').valueChanges().pipe(
      map((training) => {
        const obsArray = [];
        for (let exercise of training['exercises']) {
          obsArray.push(this.store.doc());
        }
        return combineLatest(obsArray);
      })
    );

    return this.trainingsCollection.doc(id).snapshotChanges().pipe(
      map((training) => {
        console.log(training);
      }),
      map(() => trainingDemo)
    );
  }

  /* how to get referenced document
  this.feedCollection = this.afs.collection('col-challange');
  this.feedItem = this.feedCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        //here you get the data without first name
        const data = a.payload.doc.data() as Feed;
        //get the signup_id for getting doc from coll-signup
        const signupId = data.signup_id;
        //get the related document
        return afs.collection('coll-signup').doc(signupId).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(signup => {
          //export the data in feeds interface format
          return { firstName: signup.firstName, ...data };
        });
      })
    }).flatMap(feeds => Observable.combineLatest(feeds));
    https://stackoverflow.com/questions/47174075/firestore-how-to-get-the-collection-value-from-another-collection-document-id-is
  */

  public getExerciseById(id: string): Observable<IExercise> {
    return this.exercisesCollection.doc<IExercise>(id).valueChanges();
  }
}
