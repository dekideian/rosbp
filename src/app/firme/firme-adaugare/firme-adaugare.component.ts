import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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
    private firmeService: FirmeService) { }

  ngOnInit(): void {
    this.firmeGroup = new FormGroup({
      firmaName: new FormControl(),
      angajatRosEmail: new FormControl(),
      angajatFirmaExtEmail: new FormControl()
    });
    this.firmeGroup.setValue({
      firmaName: 'ACME',
      angajatRosEmail: 'Angajat RosBP',
      angajatFirmaExtEmail : 'HR firma client'
    });
  }

  goBack() {
    this.router.navigate(['/firme']);
  }

  save() {
    const data = {
      nume: this.firmeGroup.get('firmaName').value,
      angajatFirma: this.firmeGroup.get('angajatFirmaExtEmail').value,
      angajatRos: this.firmeGroup.get('angajatRosEmail').value
    };
    this.firmeService.addFirma(data);
    console.log('Firma ', JSON.stringify(data));
    this.router.navigate(['/firme']);
  }
}
