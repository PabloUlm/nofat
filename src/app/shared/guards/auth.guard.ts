import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.authSvc.state$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }),
    );
  }

}
