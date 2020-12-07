import { Injectable } from '@angular/core';
// angular router to redirect users after they sign out
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
/*
* reduce the amount of code that your app uses by
* only including the features that you need.
*/
// import core firebase client (required)
import firebase from '@firebase/app';
// import Firebase Authentication (optional)
import '@firebase/auth';
import '@firebase/storage';
// import Firebase Realtime Database (optional)
import '@firebase/database';
// import Cloud Firestore (optional)
import '@firebase/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument

  } from '@angular/fire/firestore';

import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, ROSBP } from '../shared/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    // userList$: Observable<any>;
    user$: Observable<User>;
    loggedInUser$: Observable<User>;

    userCompany: string;
    userEmail: string; 

    constructor(
      private router: Router,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth
    ) {

      this.user$ = this.afAuth.authState.pipe(

        switchMap(user => {
          if (user) {
            this.userEmail = user.email;
            return this.afs.doc<User>(`users/${user.email}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
      this.storeUserInfo();
     // this.readUsers(); // do we actually want to read all users ?: P
    }

    getLoggedInUser(userEmail: string): Observable<User> {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userEmail}`);
      return userRef.valueChanges({fieldId: 'uid'})
        .pipe(
          tap(obj => console.log('we have: ' + JSON.stringify(obj))),
          catchError(this.handleError)
        );
      // return this.loggedInUser$.pipe(
      //   // map(ob => {
      //   //    return ob.filter(templateEntry => templateEntry.codFirma === codFirma);
      //   // }),
      //   catchError(this.handleError)
      // );
    }

    // async readUsers() {
    //   // value changes sees live changes
    //   this.userList$ = this.afs.collection('users').valueChanges()
    //   .pipe(
    //     tap(val => console.log('Avem val ', JSON.stringify(val)))
    //   );

    //   // .subscribe(val => console.log(val));//only value
    // }
    async storeUserInfo() {
      this.user$.subscribe(val => {
        this.userCompany = val.company;
      });
    }

    async googleSignin() {

      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    async signOut() {
      await this.afAuth.signOut();
      return this.router.navigate(['/']);
    }
    private updateUserData(user) {
      // sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.email}`);
      this.loggedInUser$ = userRef.valueChanges({fieldId: 'uid'});
      const data = {
        uid: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      console.log('update user data:' + user.email);
      this.userEmail = user.email;
      return userRef.set(data, { merge: true});
    }

    // TODO get info after subscribing to user, no need of sending | async from html
    isRosBpEmployee(user: User) {

      if ( user?.company?.toLocaleLowerCase() === ROSBP) {
        return true;
      } else {
        return false;
      }
    }

    isAnyEmployee(user: User) {

      if (!user || !user.company){
        return false;
      }
      if (user?.company?.toLocaleLowerCase() !== '') {
        return true;
      } else {
        return false;
      }
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
