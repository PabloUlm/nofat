import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { MaterialModule } from 'src/app/material.module';
import { PreviewComponent } from '../preview/preview.component';


@NgModule({
  declarations: [TrainingComponent, PreviewComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
  ]
})
export class TrainingModule { }
