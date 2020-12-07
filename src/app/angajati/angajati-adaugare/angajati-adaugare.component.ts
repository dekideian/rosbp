import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IAngajat } from '../angajat';
import { AngajatiService } from '../angajati.service';

@Component({
  selector: 'app-angajati-adaugare',
  templateUrl: './angajati-adaugare.component.html',
  styleUrls: ['./angajati-adaugare.component.css']
})
export class AngajatiAdaugareComponent implements OnInit {

  angajatiGroup: FormGroup;
  angajat: IAngajat;
  constructor(
    private router: Router,
    private angajatiService: AngajatiService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    //  this.firmeGroup = new FormGroup({
     this.angajatiGroup = this.fb.group({
      angajatiName:  ['', [Validators.required, Validators.minLength(3)]],
      angajatiEmail: ['', [Validators.required, Validators.email]]
    });
  }

  goBack() {
    this.router.navigate(['/angajati']);
  }

  save() {
    const data: IAngajat = {
      nume: this.angajatiGroup.get('angajatiName').value,
      email: this.angajatiGroup.get('angajatiEmail').value,
    };
    this.angajatiService.addAngajat(data);
    console.log('Angajat ', JSON.stringify(data));
    this.router.navigate(['/angajati']);
  }
}
