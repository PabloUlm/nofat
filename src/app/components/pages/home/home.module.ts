import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PlayerComponent } from '../../player/player.component';

@NgModule({
  declarations: [HomeComponent, PlayerComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ],
})
export class HomeModule { }
