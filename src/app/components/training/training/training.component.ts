import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ITraining } from '../../../shared/models/training.interface';
import { TrainingService } from '../../../shared/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.styl']
})
export class TrainingComponent implements OnInit {
  public isWorkingOut = false;
  public timer: Observable<string>;
  public defaultExerciseTime = 600; // 10 minutes

  constructor(public trainingSvc: TrainingService) { }

  ngOnInit(): void {
    this.trainingSvc.defaultTraining$.subscribe((result) => {
      console.log('RESULT:::::', result);
    });
  }

  public transformTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    return minutes + ':' + (seconds - minutes * 60);
  }

  public exerciseFinished(): void {
    console.log('finished');
  }

  public startExercise(): void {
    // this.noSleep.enable();
    this.isWorkingOut = true;
    this.timer = interval(1000).pipe(
      map(x => this.transformTime(this.defaultExerciseTime - x)),
      tap(time => {
        if (time === '0:00') {
          this.exerciseFinished();
        }
      })
    );
  }

}
