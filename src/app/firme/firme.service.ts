import { Injectable } from '@angular/core';
import { IFirma } from './ifirma.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirmeService {

  //TODO is it better to save the Observable and just subscribe to it?
  // firmeList$: Observable<any>;
  firme: IFirma[];
  firmeUrl = 'api/firme.json';
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
  //  this.readFirme();
  }

  addFirma(data: IFirma) {
    this.afs.collection(`firme`).doc(`${data.nume}`).set(data, {merge: true});
    // throw new Error('Method not implemented.');
  }

  remove(numeFirma: string) {
    this.afs.collection(`firme`).doc(`${numeFirma}`).delete();
    // throw new Error('Method not implemented.');
  }

  getFirme(): Observable<any> {
    // return this.http.get<IFirma[]>(this.firmeUrl).pipe(
    //   tap(data => console.log('We received a list of companies ', JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
    return this.afs.collection('firme').valueChanges()
    .pipe(
      tap(val => console.log('Avem val ', JSON.stringify(val))),
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
