import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilizatori-detalii',
  templateUrl: './utilizatori-detalii.component.html',
  styleUrls: ['./utilizatori-detalii.component.css']
})
export class UtilizatoriDetaliiComponent implements OnInit {
  email: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('id');
    
  }

  goBack() {
    this.router.navigate(['/utilizatori']);
  }

}
