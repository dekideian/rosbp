import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  user$: Observable<User>;
  constructor(
    private afs: AngularFirestore
    ) { 
      // this.user$ = this.afs.collection<User>('users').get()
      // .valueChanges({ idField: 'uid' });
    }
}
