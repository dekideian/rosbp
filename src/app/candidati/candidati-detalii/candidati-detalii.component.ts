import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat, ICandidat } from '../candidat';
import { CandidatiService } from '../candidati.service';

@Component({
  selector: 'app-candidati-detalii',
  templateUrl: './candidati-detalii.component.html',
  styleUrls: ['./candidati-detalii.component.css']
})
export class CandidatiDetaliiComponent implements OnInit {
  currentId: string;
  salariat: Candidat;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatiService: CandidatiService) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.candidatiService.getCandidat(this.currentId).subscribe({
      next: candidat => {
        this.salariat = candidat;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  goBack() {
    this.router.navigate(['/candidati']);
  }
}
