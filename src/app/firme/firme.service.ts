import { Injectable } from '@angular/core';
import { IFirma } from './ifirma.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firma } from './firma.model';

@Injectable({
  providedIn: 'root'
})
export class FirmeService {

  firme$: Observable<Firma[]>;
  firmeUrl = 'api/firme.json';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
  
      this.firme$ = this.afs.collection<Firma>('firme')
        .valueChanges({ idField: 'uid' });
  }

  addFirma(data: IFirma) {
    //this.afs.collection(`firme`).doc(`${data.nume}`).set(data, {merge: true});
    this.afs.collection(`firme`).add(data);
    
    // throw new Error('Method not implemented.');
  }

  remove(uidFirma: string) {
    this.afs.collection(`firme`).doc(`${uidFirma}`).delete();
    // throw new Error('Method not implemented.');
  }

  getFirme(): Observable<any> {
 
    return this.firme$.pipe(
      tap(val => console.log('Returnam firme ')),
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
