import { Injectable } from '@angular/core';
import { ICandidat, ICandidatLocal } from './candidat';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CandidatiService {

  angajati: ICandidat[];
  candidatiUrl = 'api/candidati.json';
  
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {}
  
  getCandidati(): Observable<any> {
    // return this.http.get<ICandidat[]>(this.candidatiUrl).pipe(
    //   tap(data => console.log('We received a list of companies ', JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
    return this.afs.collection('candidati').valueChanges({ idField: 'uid' })
    .pipe(
      tap(val => console.log('Avem candidati ', JSON.stringify(val))),
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

  addCandidat(data: ICandidatLocal) {
    this.afs.collection(`candidati`).add(data);
  }

  remove(idCandidat: string) {
    this.afs.collection(`candidati`).doc(`${idCandidat}`).delete();
    // throw new Error('Method not implemented.');
  }
}
