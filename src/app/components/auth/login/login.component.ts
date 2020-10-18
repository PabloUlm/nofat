import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../../shared/models/user.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.styl'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public ngOnInit(): void { }

  public onLogin(form: IUser): void {
    this.authService
      .loginByEmail(form)
      .then((res) => {
        console.log('Successfully', res);
        this.route.navigate(['/']);
      })
      .catch((err) => console.log('Error', err));
  }

}
