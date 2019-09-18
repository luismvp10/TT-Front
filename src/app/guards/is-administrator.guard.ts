import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdministratorGuard implements CanActivate {
  constructor(private user: UserService,
              private router: Router) {
  }

  canActivate(): boolean {
    if ( this.user.esAdministrador() ) {
      return true;
    } else if ( this.user.esEspecialista() ) {
      this.router.navigateByUrl('/especialist');
      return false;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
