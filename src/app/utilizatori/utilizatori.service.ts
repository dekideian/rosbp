import { Injectable } from '@angular/core';
import { rosbp } from '../shared/user.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UtilizatoriService {

  angajatiUrl = 'api/angajati.json';
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
    ) {}

  getUtilizatori(): Observable<any> {
    return this.afs.collection('angajati').valueChanges()
    .pipe(
      tap(val => console.log('Avem utilizatori ', JSON.stringify(val))),
      catchError(this.handleError)
    );
  }

 

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // be side 
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

