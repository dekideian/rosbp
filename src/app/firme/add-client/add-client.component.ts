import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Client } from 'src/app/models/Client.class';
import { FirestoreService } from 'src/app/services/firestore.services';
import { ContactInformation } from '../contact-information';
import { FirmeService } from '../firme.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  @Input() firmaUID: string;
  @Input() numeFirma: string;

  myForm;
  constructor(
    private firestoreService: FirestoreService,
    private firmeService: FirmeService
    ) {
    this.myForm =  new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
   }

  get f() {
    return this.myForm.controls;
  }

  ngOnInit(): void {
  }

  submit(formDirective: FormGroupDirective) {
    //to remove ContactInformation
    const contactInformation = new ContactInformation();
    let newClient: Client = new Client({
      nume: this.myForm.get('name').value,
      email: this.myForm.get('email').value,
      firmaUID: this.firmaUID,
      numeFirma: this.numeFirma
    });
    // console.log('Adaugam client nou '+newClient);
    this.firestoreService.addClient(newClient);
    
    //this.firmeService.addClient(contactInformation);
    this.myForm.reset();
    formDirective.resetForm();
  }
}
