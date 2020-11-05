import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITraining } from '../../../shared/models/training.interface';
import { TrainingService } from '../../../shared/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.styl']
})
export class TrainingComponent implements OnInit {
  public defaultTraining$: Observable<ITraining>;

  constructor(private trainingSvc: TrainingService) { }

  ngOnInit(): void {
    this.defaultTraining$ = this.trainingSvc.getDefaultTraining();
    this.defaultTraining$.subscribe((result) => {
      console.log('RESULT:::::', result);
    });
  }

}
