import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FileDetails, TemplateDetails } from '../shared/upload-file/uploadedFileDetails';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  fisiereDinStorage$: Observable<FileDetails[]>;
  templatesDinStorage$: Observable<TemplateDetails[]>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,

  ) {
    this.fisiereDinStorage$ = this.afs.collection<FileDetails>('fisiere')
    .valueChanges({ idField: 'uid' });

    this.templatesDinStorage$ = this.afs.collection<TemplateDetails>('templates')
    .valueChanges({ idField: 'uid' });
  }

  addFile(data: FileDetails) {
    this.afs.collection(`fisiere`).add(Object.assign({}, data));
  }

  addTemplate(data: TemplateDetails) {
    this.afs.collection(`templates`).add(Object.assign({}, data));
  }

  removeFile(idFile: string, documentURL: string) {
    this.afs.collection(`fisiere`).doc(`${idFile}`).delete();
    this.storage.refFromURL(documentURL).delete();
  }

  removeTemplate(idFile: string, documentURL: string) {
    this.afs.collection(`templates`).doc(`${idFile}`).delete();
    this.storage.refFromURL(documentURL).delete();
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

  getTemplates(codFirma: string): Observable<  TemplateDetails[]> {
    console.log('Filtram dupa cod firma: ' + codFirma);
    return this.templatesDinStorage$.pipe(
      map(ob => {
         return ob.filter(templateEntry => templateEntry.codFirma === codFirma);
      }),
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
