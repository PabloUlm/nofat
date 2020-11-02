import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {
  public users$: Observable<IUserData[]>;

  constructor(private userSrv: UserService) {
    this.users$ = userSrv.getAllUsers();
  }

  public ngOnInit(): void {
  }

}
