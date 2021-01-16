import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IUtilizator } from '../utilizator';
import { UtilizatoriService } from '../utilizatori.service';
import { FirestoreService } from 'src/app/services/firestore.services';
import { Utilizator } from 'src/app/models/utilizator.class';

@Component({
  selector: 'app-utilizatori-adaugare',
  templateUrl: './utilizatori-adaugare.component.html',
  styleUrls: ['./utilizatori-adaugare.component.css']
})
export class UtilizatoriAdaugareComponent implements OnInit {

  utilizatoriGroup: FormGroup;
  utilizator: IUtilizator;
  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private utilizatoriService: UtilizatoriService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {    
     this.utilizatoriGroup = this.fb.group({
      utilizatoriName:  ['', [Validators.required, Validators.minLength(3)]],
      utilizatoriEmail: ['', [Validators.required, Validators.email]]
    });
  }

  goBack() {
    this.router.navigate(['/utilizatori']);
  }

  save() {
    const utilizator = new Utilizator({nume: this.utilizatoriGroup.get('utilizatoriName').value, email: this.utilizatoriGroup.get('utilizatoriEmail').value});
    this.firestoreService.addUtilizator(utilizator);
    this.router.navigate(['/utilizatori']);
  }
}
