import { Injectable } from '@angular/core';
import { Candidat, ICandidat, ICandidatLocal } from './candidat';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, filter, map, first,mergeAll } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CandidatiService {

  salariati$: Observable<Candidat[]>;
  candidatiUrl = 'api/candidati.json';
  
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
      this.salariati$ = this.afs.collection<Candidat>('candidati')
        .valueChanges({ idField: 'uid' });
        
                // .pipe(
        //   map(collection => {
        //     return collection.map(candi => {
        //         let candidat = new Candidat();
        //         candidat.uid = candi.uid;
        //         candidat.nrContract = candi.nrContract;
        //         candidat.dataContract: candi.da;
        //         candidat.numeSalariat: string;
        //         candidat.prenumeSalariat: string;
        //         candidat.marca: string;
        //         candidat.tara: string;
        //         candidat.judet: string;
        //         candidat.localitate: string;
        //         candidat.strada: string;
        //         candidat.numar: string;
        //         candidat.bloc: string;
        //         candidat.scara: string;
        //         candidat.etaj: string;
        //         candidat.apartament: string;
        //         candidat.actIdentitate: string;
        //         candidat.serieCI: string;
        //         candidat.numarCI: string;
        //         candidat.unitateaCareAEliberatCI: string;
        //         candidat.dataEliberareCI: string;
        //         candidat.dataExpirareCI: string;
        //         candidat.cnp: string;
        //         candidat.dataAngajare: string;
        //         candidat.dataAngajareNedeterminat: string;
        //         candidat.nrLuniSaptamaniAni: string;
        //         candidat.dataInceputCimDeteriminat: string;
        //         candidat.dataSfarsitCimDeterminat: string;
        //         candidat.departament: string;
        //         candidat.locDeMunca: string;
        //         candidat.functia: string;
        //         candidat.codCOR: string;
        //         candidat.normaIntreagaDeLucruOreZi: string;
        //         candidat.normaIntreagaDeLucruOreSapt: string;
        //         candidat.normaPartiala: string;
        //         candidat.repartizareProgramPtNormaPartiala: string;
        //         candidat.repartizareTimpMunca: string;
        //         candidat.tipIntervalRepartizare: string;
        //         candidat.durataConcediuDeOdihna: string;
        //         candidat.salariulDeBazaBrut: string;
        //         candidat.perioadaDeProba: string;
        //         candidat.perioadaDePreavizInCazulConcedierii: string;
        //         candidat.perioadaDePreavizInCazulDemisiei: string;
        //         candidat.anulCurent: string;
        //         candidat.nrInregCerereDeAngajare: string;
        //         candidat.nrInregDeclaratieFunctieDeBaza: string;
        //         candidat.nrInregDeclaratiePersoaneInIntretinere: string;
        //         candidat.nrInregDeclaratieCasaDeSanatate: string;
        //         candidat.nrInregDeclLuareLaCunostintaROI: string;
        //         candidat.nrInregPlanificareaZilelorDeCO: string;
        //         candidat.nrZileCOConveniteInAnulCurent: string;
        //         candidat.platitorDeImpozit: string;
        //         candidat.functiaDeBaza: string;
        //         candidat.mail: string;
        //         candidat.parolaWeb: string;
        //         candidat.locatiePlata: string;
        //         candidat.bancaAngajator: string;
        //         candidat.iban: string;
        //         candidat.tipContract: string;
        //         candidat.sablonContractNexus: string;
        //         candidat.angajatorNexus: string;
        //         candidat.cuiAngajator: string;
        //         candidat.cuiLocDeMunca: string;
        //         candidat.ticheteDeMasa: string;
        //         candidat.studiiSCED: string;

        //         console.log(candidat);
        //         console.log(candi);
        //         return candidat;
        //     });
    }

  getCandidat(currentId: string): Observable<Candidat> {
    return this.salariati$.pipe(
      map(ob => {
         return ob.filter(bla => bla.uid === currentId);
      }),
      mergeAll(),
      tap(val => console.log('Avem 1 salariati ', JSON.stringify(val))),
      catchError(this.handleError)
    );


  }

  getCandidati(): Observable<any> {
    // return this.http.get<ICandidat[]>(this.candidatiUrl).pipe(
    //   tap(data => console.log('We received a list of companies ', JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
    return this.salariati$.pipe(
      tap(val => console.log('Avem salariati ', JSON.stringify(val))),
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
