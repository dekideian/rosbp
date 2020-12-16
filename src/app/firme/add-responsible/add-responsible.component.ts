import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { IAngajat } from 'src/app/angajati/angajat';
import { AngajatiService } from 'src/app/angajati/angajati.service';
import { ContactInformation } from '../contact-information';
import { FirmeService } from '../firme.service';

@Component({
  selector: 'app-add-responsible',
  templateUrl: './add-responsible.component.html',
  styleUrls: ['./add-responsible.component.css']
})
export class AddResponsibleComponent implements OnInit {
  
  @Input() firmaUID: string;
  @Input() numeFirma: string;
  angajati: IAngajat[];

  myForm =  new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  get f() {
    return this.myForm.controls;
  }
  constructor(
    private firmeService: FirmeService,
    private angajatiService: AngajatiService
    ) {
      this.angajatiService.getAngajati().subscribe({
        next: angajati => {
          this.angajati = angajati;
        },
        error: err => {
        }
      });
    }

  ngOnInit(): void {
    this.onChanges();
    this.myForm.get('name').disable();
  }

  submit(formDirective: FormGroupDirective) {
    const contactInformation = new ContactInformation();
    contactInformation.nume = this.myForm.get('name').value;
    contactInformation.email = this.myForm.get('email').value;
    contactInformation.numeFirma = this.numeFirma;
    contactInformation.firmaUID = this.firmaUID;
    console.log('adaugare responsabil')
    this.firmeService.addResponsible(contactInformation);
    this.myForm.reset();
    formDirective.resetForm();
  }
  onChanges() {
    this.myForm.get('email').valueChanges.subscribe(val => {
      this.angajati.filter(value => {
        if(value.email === val) {
          this.myForm.get('name').setValue(value.nume);
        }
      });
    });
  }
}
