import { Injectable } from '@angular/core';
import { Candidat, ICandidatLocal } from './candidat';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, filter, map, first,mergeAll } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileDetails } from '../shared/upload-file/uploadedFileDetails';

@Injectable({
  providedIn: 'root'
})
export class SalariatiService {

  salariati$: Observable<Candidat[]>;
  candidatiUrl = 'api/candidati.json';
  
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
      this.salariati$ = this.afs.collection<Candidat>('candidati')
        .valueChanges({ idField: 'uid' });
    }

  getCandidat(currentId: string): Observable<Candidat> {
    return this.salariati$.pipe(
      map(ob => {
         return ob.filter(bla => bla.uid === currentId);
      }),
      mergeAll(),
      tap(val => console.log('Avem 1 salariati ', JSON.stringify(val.uid))),
      catchError(this.handleError)
    );
  }

  getCandidati(): Observable<any> {
    return this.salariati$.pipe(
       tap(val => console.log('Returnam salariati ')),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
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
