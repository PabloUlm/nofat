import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IExercise } from '../models/exercise.interface';
import { ITraining } from '../models/training.interface';
import { Observable } from 'rxjs';
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

  public getDefaultTraining(): Observable<ITraining> {
    return this.getTrainingById('default');
  }

  public getTrainingById(id: string): Observable<void> { // <ITraining> {
    return this.trainingsCollection.doc(id).valueChanges().pipe(
      map((actions) => {
        actions.map((a) => {
          const data = a.payload.doc.data() as ITraining;
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
      })
    );
  }

  public getExerciseById(id: string): Observable<IExercise> {
    return this.exercisesCollection.doc<IExercise>(id).valueChanges();
  }
}
