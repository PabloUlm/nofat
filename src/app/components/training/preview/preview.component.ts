import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITraining } from '../../../shared/models/training.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.styl']
})
export class PreviewComponent implements OnInit {

  @Input() training$: BehaviorSubject<ITraining> = new BehaviorSubject({});

  constructor() { }

  ngOnInit(): void {
  }

}
