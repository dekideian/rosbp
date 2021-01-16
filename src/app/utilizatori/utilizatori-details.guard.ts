import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class UtilizatoriDetailsGuard implements CanActivate {
  constructor(private router: Router, public dialog: MatDialog) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const param = next.paramMap.get('id');
      const id = +param;
      if (isNaN(id) || id < 1) {
        alert(`Invalid product id ${param}`);
        console.log('oops');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
      //  this.dialog.open(FirmeListComponent, dialogConfig);
       //create a nicer component for this dialog..maybe..  it loads the component within.. :))

        this.router.navigate(['/utilizatori']);
        return false;
      }
      return true;
  }
  
}
