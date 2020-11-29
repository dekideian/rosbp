import { Injectable } from '@angular/core';
import { IAngajat } from './angajat';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AngajatiService {
  angajati: IAngajat[];
  angajatiUrl = 'api/angajati.json';
  constructor(private http: HttpClient) {}
  getAngajati(): Observable<IAngajat[]> {
    return this.http.get<IAngajat[]>(this.angajatiUrl).pipe(
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

