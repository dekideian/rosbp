import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirmeService } from '../firme.service';
import { Router } from '@angular/router';
import { Firma } from 'src/app/models/Firma.class';
import { FirestoreService } from 'src/app/services/firestore.services';

@Component({
  selector: 'app-firme-list',
  templateUrl: './firme-list.component.html',
  styleUrls: ['./firme-list.component.css']
})
export class FirmeListComponent implements OnInit {

  firme: Firma[];
  firmeFiltrate: Firma[];
  listFilterField = '';
  errorMessage = '';
  constructor(
              private firestoreService: FirestoreService,
              private router: Router,
              private firmeService: FirmeService,
              public auth: AuthService) { }

  get listFilter(): string {
    return this.listFilterField;
  }
  set listFilter(value: string) {
    this.listFilterField = value;
    this.firmeFiltrate = this.listFilter ? this.performFilter(this.listFilter) : this.firme;
  }
  performFilter(filterBy: string): Firma[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.firme.filter((firma: Firma) =>
        firma.nume.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.initializeFirmeState();
  }

  async initializeFirmeState() {
    const firme:Firma[] = await this.firestoreService.getAllFirmeList();
    firme.sort((a, b) => a.nume < b.nume ? -1 : (a.nume > b.nume ? 1 : 0));
    this.firme = firme; 
    this.firmeFiltrate = firme;   
  }


  adaugaFirma() {
    this.router.navigate(['/firme/adauga'])
  }
  delete(uidFirma: string) {
    const result = confirm("Esti sigur ca vrei sa stergi ? ");
    if (result) {
      //this.firmeService.remove(uidFirma);
      this.firestoreService.removeFirma(uidFirma);
      this.firme.forEach( (item, index) => {
        if(item.id === uidFirma) this.firme.splice(index,1);
      });      
    }
  }

  edit(uidFirma: string) {
    this.router.navigate([`/firme/editare/${uidFirma}`]);    
  }
}
