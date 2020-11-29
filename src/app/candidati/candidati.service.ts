import { Injectable } from '@angular/core';
import { ICandidat } from './candidat';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatiService {
  angajati: ICandidat[];
  candidatiUrl = 'api/candidati.json';
  
  constructor(private http: HttpClient) {}
  
  getCandidati(): Observable<ICandidat[]> {
    return this.http.get<ICandidat[]>(this.candidatiUrl).pipe(
      tap(data => console.log('We received a list of companies ', JSON.stringify(data))),
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
