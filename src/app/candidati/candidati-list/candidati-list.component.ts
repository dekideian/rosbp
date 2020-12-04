import { Component, OnInit } from '@angular/core';
import { ICandidat } from '../candidat';
import { CandidatiService } from '../candidati.service';

@Component({
  selector: 'app-candidati-list',
  templateUrl: './candidati-list.component.html',
  styleUrls: ['./candidati-list.component.css']
})
export class CandidatiListComponent implements OnInit {

  candidati: ICandidat[];
  candidatiFiltrate: ICandidat[];
  listFilterField = '';
  errorMessage = '';
  constructor(private candidatiService: CandidatiService) { }

  get listFilter(): string {
    return this.listFilterField;
  }
  set listFilter(value: string) {
    this.listFilterField = value;
    this.candidatiFiltrate = this.listFilter ? this.performFilter(this.listFilter) : this.candidati;
  }
  performFilter(filterBy: string): ICandidat[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.candidati.filter((candidat: ICandidat) =>
      candidat.nume.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.candidatiService.getCandidati().subscribe({
      next: candidati => {
        this.candidati = candidati;
        this.candidatiFiltrate = candidati;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }
  delete(idCandidat: string) {
    this.candidatiService.remove(idCandidat);
  }
}
