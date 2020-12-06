import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FileDetails } from '../shared/upload-file/uploadedFileDetails';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  fisiereDinStorage$: Observable<FileDetails[]>;

  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient,
    private afs: AngularFirestore,

  ) {
    this.fisiereDinStorage$ = this.afs.collection<FileDetails>('fisiere')
    .valueChanges({ idField: 'uid' });
  }

  addFile(data: FileDetails) {
    this.afs.collection(`fisiere`).add(Object.assign({}, data));
  }

  removeFile(idFile: string, documentURL: string) {
    this.afs.collection(`fisiere`).doc(`${idFile}`).delete();
    this.storage.refFromURL(documentURL).delete();
    //TODO remove from storage as well.. 
    // throw new Error('Method not implemented.');
  }

  getFiles(salariatId: string): Observable<FileDetails[]> {
    return this.fisiereDinStorage$.pipe(
      map(ob => {
         return ob.filter(bla => bla.salariat === salariatId);
      }),
      // tap(val => console.log('Avem 1 fisier pt acest salariat ')),
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
