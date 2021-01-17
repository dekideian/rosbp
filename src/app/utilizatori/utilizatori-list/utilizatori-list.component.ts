import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilizator } from 'src/app/models/utilizator.class';
import { FirestoreService } from 'src/app/services/firestore.services';

@Component({
  selector: 'app-utilizatori-list',
  templateUrl: './utilizatori-list.component.html',
  styleUrls: ['./utilizatori-list.component.css']
})
export class UtilizatoriListComponent implements OnInit {

  utilizatori: Utilizator[];
  listFilterField = '';
  errorMessage = '';  
  
  constructor(
    private firestoreService: FirestoreService,
    private router: Router
    ) { }
 
  ngOnInit(): void {
    this.initializeUtilizatoriState();
  }
  
  async initializeUtilizatoriState() {
    const utilizatori:Utilizator[] = await this.firestoreService.getAllUtilizatoriList();
    utilizatori.sort((a, b) => a.nume < b.nume ? -1 : (a.nume > b.nume ? 1 : 0));
    this.utilizatori = utilizatori;    
  }

  delete(utilizatorId: string, email: string) {
    this.firestoreService.removeUtilizator(utilizatorId, email);
     
     this.utilizatori.forEach( (item, index) => {
      if(item.id === utilizatorId) this.utilizatori.splice(index,1);
    });
    
  }

  adaugaUtilizator() {
    this.router.navigate(['/utilizatori/adauga'])
  }
}
