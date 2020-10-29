import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFile } from 'src/app/shared/models/file.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from '../../shared/models/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl'],
})
export class AdminComponent implements OnInit {

  public image: IFile;
  public currentImage = 'https://picsum.photos/id/113/150/150';

  constructor(private authSvc: AuthService) { }

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

  public onSaveUser(user: IUser): void {
    this.authSvc.preSaveUserProfile(user, this.image);
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
