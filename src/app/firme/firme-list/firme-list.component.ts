import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IFirma } from '../ifirma.model';
import { FirmeService } from '../firme.service';

@Component({
  selector: 'app-firme-list',
  templateUrl: './firme-list.component.html',
  styleUrls: ['./firme-list.component.css']
})
export class FirmeListComponent implements OnInit {

  firme: IFirma[];
  firmeFiltrate: IFirma[];
  listFilterField = '';
  errorMessage = '';
  constructor(private firmeService: FirmeService,
              public auth: AuthService) { }

  get listFilter(): string {
    return this.listFilterField;
  }
  set listFilter(value: string) {
    this.listFilterField = value;
    this.firmeFiltrate = this.listFilter ? this.performFilter(this.listFilter) : this.firme;
  }
  performFilter(filterBy: string): IFirma[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.firme.filter((firma: IFirma) =>
        firma.nume.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.firmeService.getFirme().subscribe({
      next: firme => {
        this.firme = firme;
        this.firmeFiltrate = firme;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }
  delete(uidFirma: string) {
    const result = confirm("Esti sigur ca vrei sa stergi ? ");
    if (result) {
      this.firmeService.remove(uidFirma);

      // this.firmeService.removeAllClients(uidFirma);
      // this.firmeService.removeAllResponsibles(uidFirma);
      console.log('remove item ' + uidFirma);
    }
  }
}
