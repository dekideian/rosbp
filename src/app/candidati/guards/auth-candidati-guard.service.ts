import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthCandidatiGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    
    if (this.auth.isAdmin()==false && this.auth.isRosBpEmployee()==false && this.auth.isAnyEmployee()==false) {
      this.router.navigate(['auth']);
      return false;
    } 
    return true;
  }
}
