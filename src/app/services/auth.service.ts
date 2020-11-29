import { Injectable } from '@angular/core';
// angular router to redirect users after they sign out
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user.model';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    userList$: Observable<any>;
    user$: Observable<User>;
    constructor(
      private router: Router,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth
    ) {

      this.user$ = this.afAuth.authState.pipe(

        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.email}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
      this.readUsers();
    }

    async readUsers() {
      // value changes sees live changes
      this.userList$ = this.afs.collection('users').valueChanges()
      .pipe(
        tap(val => console.log('Avem val ', JSON.stringify(val)))
      );

      // .subscribe(val => console.log(val));//only value
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

      const data = {
        uid: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      return userRef.set(data, { merge: true});
    }
  }
