import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-angajati-detalii',
  templateUrl: './angajati-detalii.component.html',
  styleUrls: ['./angajati-detalii.component.css']
})
export class AngajatiDetaliiComponent implements OnInit {
  currentId: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentId = +this.route.snapshot.paramMap.get('id');
    
  }

  goBack() {
    this.router.navigate(['/angajati']);
  }

}
