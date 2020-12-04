import { Component, OnInit } from '@angular/core';
import { IAngajat } from '../angajat';
import { AngajatiService } from '../angajati.service';

@Component({
  selector: 'app-angajati-list',
  templateUrl: './angajati-list.component.html',
  styleUrls: ['./angajati-list.component.css']
})
export class AngajatiListComponent implements OnInit {
  angajati: IAngajat[];
  angajatiFiltrate: IAngajat[];
  listFilterField = '';
  errorMessage = '';
  constructor(private angajatiService: AngajatiService) { }

  get listFilter(): string {
    return this.listFilterField;
  }
  set listFilter(value: string) {
    this.listFilterField = value;
    this.angajatiFiltrate = this.listFilter ? this.performFilter(this.listFilter) : this.angajati;
  }
  performFilter(filterBy: string): IAngajat[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.angajati.filter((firma: IAngajat) =>
        firma.nume.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.angajatiService.getAngajati().subscribe({
      next: angajati => {
        this.angajati = angajati;
        this.angajatiFiltrate = angajati;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }
  delete(emailAngajat: string) {
    this.angajatiService.remove(emailAngajat);
  }

}
