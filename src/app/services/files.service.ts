import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ContactInformation } from '../firme/contact-information';
import { FileDetails, TemplateDetails } from '../shared/upload-file/uploadedFileDetails';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  fisiereDinStorage$: Observable<FileDetails[]>;
  templatesDinStorage$: Observable<TemplateDetails[]>;
  clienti$: Observable<ContactInformation[]>;
  responsabili$: Observable<ContactInformation[]>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,

  ) {
    this.fisiereDinStorage$ = this.afs.collection<FileDetails>('fisiere')
    .valueChanges({ idField: 'uid' });

    this.templatesDinStorage$ = this.afs.collection<TemplateDetails>('templates')
    .valueChanges({ idField: 'uid' });

    this.clienti$ = this.afs.collection<ContactInformation>('clienti')
    .valueChanges({ idField: 'uid' });

    this.responsabili$ = this.afs.collection<ContactInformation>('responsabili')
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

  removeClient(idClient: string) {
    this.afs.collection(`clienti`).doc(`${idClient}`).delete();
  }

  removeResponsabil(idResponsabil: string) {
    this.afs.collection(`responsabili`).doc(`${idResponsabil}`).delete();
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

  getTemplates(codFirma: string): Observable<TemplateDetails[]> {    
    return this.templatesDinStorage$.pipe(
      map(ob => {
         return ob.filter(templateEntry => templateEntry.codFirma === codFirma);
      }),
      catchError(this.handleError)
    );
  }

  getClienti(firmaUID: string): Observable<ContactInformation[]> {    
    return this.clienti$.pipe(
      map(ob => {
         return ob.filter(templateEntry => templateEntry.firmaUID === firmaUID);
      }),
      catchError(this.handleError)
    );
  }

  getResponsabili(firmaUID: string): Observable<ContactInformation[]> {  
    return this.responsabili$.pipe(
      map(ob => {
         return ob.filter(templateEntry => templateEntry.firmaUID === firmaUID);
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
