import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument

} from '@angular/fire/firestore';
import { FirmeService } from '../firme.service';
import { FirestoreService } from 'src/app/services/firestore.services';
import { Firma } from 'src/app/models/Firma.class';
@Component({
  selector: 'app-firme-adaugare',
  templateUrl: './firme-adaugare.component.html',
  styleUrls: ['./firme-adaugare.component.css']
})
export class FirmeAdaugareComponent implements OnInit {
  firmeGroup: FormGroup;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private firmeService: FirmeService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    //  this.firmeGroup = new FormGroup({
     this.firmeGroup = this.fb.group({
      firmaName:  ['', [Validators.required, Validators.minLength(2)]],
      sediu:  ['', [Validators.required, Validators.minLength(2)]],
      regComert:  ['', [Validators.required, Validators.minLength(2)]],
      nr:  ['', [Validators.required, Validators.minLength(2)]],
      cui:  ['', [Validators.required, Validators.minLength(2)]],
      rep:  ['', [Validators.required, Validators.minLength(2)]],
      telefon:  ['', [Validators.required, Validators.minLength(2)]]
      // codFirma:  ['', [Validators.required, Validators.minLength(2)]],
      // angajatRosEmail: ['', [Validators.required, Validators.email]],
      // angajatFirmaExtEmail: ['', [Validators.required, Validators.email]],
    });
  }

  goBack() {
    this.router.navigate(['/firme']);
  }

  save() {
 
    const newFirma = new Firma({      
      CUI: this.firmeGroup.get('cui').value,
      nr: this.firmeGroup.get('nr').value,
      nume: this.firmeGroup.get('firmaName').value,
      regComert: this.firmeGroup.get('regComert').value,
      rep: this.firmeGroup.get('rep').value,
      sediu: this.firmeGroup.get('sediu').value,
      telefon: this.firmeGroup.get('telefon').value
    });
    this.firestoreService.addFirma(newFirma);    
    this.router.navigate(['/firme']);
  }
}
