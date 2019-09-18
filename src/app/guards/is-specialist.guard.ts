import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsSpecialistGuard implements CanActivate {

  constructor(private user: UserService,
              private router: Router) {
  }

  canActivate(): boolean {
    if ( this.user.esEspecialista() ) {
      return true;
    } else if ( this.user.esAdministrador() ) {
      this.router.navigateByUrl('/admon');
      return false;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
