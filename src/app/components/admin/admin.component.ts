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
  public currentImage = 'https://picsum.photos/id/113/150/150';

  constructor(private authSvc: AuthService, private userSvc: UserService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });

  public ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      this.initValuesForm(user);

    });
  }

  public onSaveUser(user: IUserData): void {
    this.userSvc.saveUserData(user, this.image)
    .then(() => {
      console.log('Documento creado exitósamente!');
    });
  }

  private initValuesForm(user: IUser): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  public handleImage(image: IFile): void {
    this.image = image;
  }

  public onLogout(): void {
    this.authSvc.logout();
  }

}
