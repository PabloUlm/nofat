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
  public isWorkingOut = false;
  constructor(public trainingSvc: TrainingService) { }

  ngOnInit(): void {
    this.trainingSvc.defaultTraining$.subscribe((result) => {
      console.log('RESULT:::::', result);
    });
  }

}
