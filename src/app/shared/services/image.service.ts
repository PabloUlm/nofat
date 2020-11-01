import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IFile } from '../models/file.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private storage: AngularFireStorage) { }

  public uploadImage(image: IFile, name: string): AngularFireUploadTask {
    const fileRef = this.storage.ref(name);
    return this.storage.upload(name, image);
  }

  public downloadURL(image: string): Observable<any> {
    return this.storage.ref(image).getDownloadURL();
  }

  /* public deleteImage(image: string): void {
    this.storage.ref(image).delete();
  } */
}
