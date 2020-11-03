import { Component, Input, OnInit } from '@angular/core';
import { IUserData } from '../../shared/models/user.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.styl']
})
export class PlayerComponent implements OnInit {
  @Input() player: IUserData;

  constructor() {
    console.log('player constructor!');
  }

  ngOnInit(): void {
    console.log('player init!');
  }

}
