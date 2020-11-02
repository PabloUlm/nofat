import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFile } from 'src/app/shared/models/file.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser, IUserData } from '../../shared/models/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl'],
})
export class AdminComponent implements OnInit {

  public image: IFile;
  // tslint:disable-next-line:max-line-length
  public currentImage = 'https://media-exp1.licdn.com/dms/image/C4D03AQGF32gXAyOGLg/profile-displayphoto-shrink_800_800/0?e=1609977600&v=beta&t=0bKr4eu68t4XRZjaN4AqIiS57S0hF9EAJuWvJH2OP4Q';

  constructor(private authSvc: AuthService, private userSvc: UserService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
  });

  public ngOnInit(): void {
    this.userSvc.getCurrentUser().subscribe((user: IUserData) => {
      this.initValuesForm(user);

    });
  }

  public onSaveUser(user: IUserData): void {
    this.userSvc.saveUserData(user, this.image);
  }

  private initValuesForm(user: IUserData): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
    });
  }

  public handleImage(image: IFile): void {
    this.image = image;
    this.userSvc.saveUserData(this.profileForm.value, image);
  }

  public onLogout(): void {
    this.authSvc.logout();
  }

}
