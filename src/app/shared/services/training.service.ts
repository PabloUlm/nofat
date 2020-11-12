import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IExercise } from '../models/exercise.interface';
import { ITraining } from '../models/training.interface';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public trainingsCollection: AngularFirestoreCollection;
  public exercisesCollection: AngularFirestoreCollection;
  public defaultTraining$: BehaviorSubject<ITraining> = new BehaviorSubject({});

  constructor(private store: AngularFirestore) {
    this.trainingsCollection = store.collection('trainings');
    this.exercisesCollection = store.collection('exercises');
    this.initTrainingById('default');
  }

  public initTrainingById(id: string): void {
    this.store.doc(`trainings/${id}`).valueChanges().pipe(
      map((training) => {
        const exercisesArray = [];
        for (const exerciseId of training['exercises']) {
          exercisesArray.push(this.store.doc(`exercises/${exerciseId}`).valueChanges().pipe(
            map((exercise) => {
              exercise['id'] = exerciseId;
              return exercise;
            }),
          ));
        }
        combineLatest(exercisesArray).subscribe(
          (exercises: any) => {
            this.defaultTraining$.next(exercises);
          }
        );
      })
    ).subscribe();
  }

  public getExerciseById(id: string): Observable<IExercise> {
    return this.exercisesCollection.doc<IExercise>(id).valueChanges();
  }
}
