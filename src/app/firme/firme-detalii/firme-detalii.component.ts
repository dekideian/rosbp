import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFirma } from '../ifirma.model';
@Component({
  selector: 'app-firme-detalii',
  templateUrl: './firme-detalii.component.html',
  styleUrls: ['./firme-detalii.component.css']
})
export class FirmeDetaliiComponent implements OnInit {
  currentId: string;
  firmaId: IFirma;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    
  }

  goBack() {
    this.router.navigate(['/firme']);
  }
}
