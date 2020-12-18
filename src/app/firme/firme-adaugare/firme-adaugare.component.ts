import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IFirma } from '../ifirma.model';
import { Firma } from '../firma.model';
import {
  AngularFirestore,
  AngularFirestoreDocument

} from '@angular/fire/firestore';
import { FirmeService } from '../firme.service';
@Component({
  selector: 'app-firme-adaugare',
  templateUrl: './firme-adaugare.component.html',
  styleUrls: ['./firme-adaugare.component.css']
})
export class FirmeAdaugareComponent implements OnInit {
  firmeGroup: FormGroup;
  firma: IFirma = new Firma();
  constructor(
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
    const data = {
      uid: null,
      nume: this.firmeGroup.get('firmaName').value,
      sediu: this.firmeGroup.get('sediu').value,
      regComert: this.firmeGroup.get('regComert').value,
      nr: this.firmeGroup.get('nr').value,
      CUI: this.firmeGroup.get('cui').value,
      rep: this.firmeGroup.get('rep').value,
      telefon: this.firmeGroup.get('telefon').value
      // codFirma: this.firmeGroup.get('codFirma').value,
      // angajatFirma: this.firmeGroup.get('angajatFirmaExtEmail').value,
      // angajatRos: this.firmeGroup.get('angajatRosEmail').value
    };
    this.firmeService.addFirma(data);
    console.log('Firma ', JSON.stringify(data));
    this.router.navigate(['/firme']);
  }
}
