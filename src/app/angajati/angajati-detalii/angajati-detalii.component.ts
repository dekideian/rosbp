import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-angajati-detalii',
  templateUrl: './angajati-detalii.component.html',
  styleUrls: ['./angajati-detalii.component.css']
})
export class AngajatiDetaliiComponent implements OnInit {
  email: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('id');
    
  }

  goBack() {
    this.router.navigate(['/utilizatori']);
  }

}
