import { Injectable } from '@angular/core';
import { IFirma } from './ifirma.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, mergeAll } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firma } from './firma.model';
import { ContactInformation } from './contact-information';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class FirmeService {
  
  getFirma(codFirma: string): Observable<any> {
    // return this.afs.collection(`firme`).doc(`${codFirma}`).get();

   return this.firme$.pipe(
      map(ob => {
         return ob.filter(bla => bla.uid === codFirma);
      }),
      mergeAll(),
      tap(val => console.log('Avem 1 salariati ', JSON.stringify(val.uid))),
      catchError(this.handleError)
    );
  }

  firme$: Observable<Firma[]>;
  responsabili$: Observable<ContactInformation[]>;
  clienti$: Observable<ContactInformation[]>;
  firmeUrl = 'api/firme.json';

  removeAllClients(uidFirma: string) {
    throw new Error('Method not implemented.');
  }
  removeAllResponsibles(uidFirma: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
  
      this.firme$ = this.afs.collection<Firma>('firme')
        .valueChanges({ idField: 'uid' });

      this.responsabili$ = this.afs.collection<ContactInformation>('responsabili')
        .valueChanges({ idField: 'uid' });

        this.clienti$ = this.afs.collection<ContactInformation>('clienti')
        .valueChanges({ idField: 'uid' });
  }

  
  addFirma(data: IFirma) {
    //this.afs.collection(`firme`).doc(`${data.nume}`).set(data, {merge: true});
    this.afs.collection(`firme`).add(data);
    
    // throw new Error('Method not implemented.');
  }


  // getFirmeWhereResponsible(email: string)

  getContactInfoIfResponsible(email: string): Observable<any> {
    return this.responsabili$.pipe(
      map(ob => {
         return ob.filter(bla => 
          (bla.email === email)
          );
      }),
      tap(val => console.log(`Avem ${email} responsabil pt firma:  `, JSON.stringify(val))),
      catchError(this.handleError)
    );
  }

  getContactInfoIfClient(email: string): Observable<any> {
    return this.clienti$.pipe(
      map(ob => {
         return ob.filter(bla => 
          (bla.email === email)
          );
      }),
      tap(val => console.log(`Avem ${email} client pt firma:  `, JSON.stringify(val))),
      catchError(this.handleError)
    );
  }

  addClient(data: ContactInformation) {
    this.afs.collection(`clienti`).add(Object.assign({}, data));
    const newData = {
      uid: data.email,
      company: data.firmaUID
    };
    this.afs.doc(`users/${data.email}`).set(newData, {merge: true});
  }

  addResponsible(data: ContactInformation) {

    this.afs.collection(`responsabili`).add(Object.assign({}, data));
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

  getResponsabili(): Observable<any> {
 
    return this.firme$.pipe(
      tap(val => console.log('Returnam responsabili')),
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
