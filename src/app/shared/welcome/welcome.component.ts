import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, filter, map, first,mergeAll } from 'rxjs/operators';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  coduriCorUrl = 'api/quotes.json';
  quote: {
    text: string,
    author: string
  };
  errorMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCoduriCor().subscribe({
      next: quotes => {
        let randomId = this.randomInteger(1, quotes.length-1);
        this.quote = quotes[randomId];
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }
  getCoduriCor(): Observable<any> {
    return this.http.get<any>(this.coduriCorUrl).pipe(
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
  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
