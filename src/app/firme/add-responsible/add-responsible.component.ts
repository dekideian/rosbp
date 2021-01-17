import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Utilizator } from 'src/app/models/utilizator.class';
import { FirestoreService } from 'src/app/services/firestore.services';
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
  utilizatori: Utilizator[];

  myForm =  new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  get f() {
    return this.myForm.controls;
  }
  constructor(
    private firmeService: FirmeService,
    private firestoreService: FirestoreService
    ) {
      
    }

  ngOnInit(): void {
    this.onChanges();
    this.myForm.get('name').disable();
    this.initializeUtilizatoriState();
  }

  async initializeUtilizatoriState() {
    const utilizatori:Utilizator[] = await this.firestoreService.getAllUtilizatoriList();
    utilizatori.sort((a, b) => a.email < b.email ? -1 : (a.email > b.email ? 1 : 0));
    this.utilizatori = utilizatori;    
  }

  submit(formDirective: FormGroupDirective) {
    const contactInformation = new ContactInformation();
    contactInformation.nume = this.myForm.get('name').value;
    contactInformation.email = this.myForm.get('email').value;
    contactInformation.numeFirma = this.numeFirma;
    contactInformation.firmaUID = this.firmaUID;
    this.firmeService.addResponsible(contactInformation);
    this.myForm.reset();
    formDirective.resetForm();
  }
  onChanges() {
    this.myForm.get('email').valueChanges.subscribe(val => {
      this.utilizatori.filter(value => {
        if(value.email === val) {
          this.myForm.get('name').setValue(value.nume);
        }
      });
    });
  }
}
