import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
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
  constructor(private firmeService: FirmeService) {
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
    const contactInformation = new ContactInformation();
    contactInformation.nume = this.myForm.get('name').value;
    contactInformation.email = this.myForm.get('email').value;
    contactInformation.firmaUID = this.firmaUID;
    contactInformation.numeFirma = this.numeFirma;
    this.firmeService.addClient(contactInformation);
    this.myForm.reset();
    formDirective.resetForm();
  }
}
