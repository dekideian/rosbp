import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.services';
import { Firma } from '../firma.model';
import { FirmeService } from '../firme.service';

@Component({
  selector: 'app-firme-editare',
  templateUrl: './firme-editare.component.html',
  styleUrls: ['./firme-editare.component.css']
})
export class FirmeEditareComponent implements OnInit {

  firmeGroup: FormGroup;
  firmaId: string;
  firma: Firma;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private firmeService: FirmeService,
    private fb: FormBuilder,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.firmaId = this.route.snapshot.paramMap.get('id');    
    this.firmeService.getFirma(this.firmaId).subscribe(
      item=>{                
        this.firma = item;
        this.firmeGroup = this.fb.group({
          firmaName:  [this.firma?.nume, [Validators.required, Validators.minLength(2)]],
          sediu:  [this.firma?.sediu, [Validators.required, Validators.minLength(2)]],
          regComert:  [this.firma?.regComert, [Validators.required, Validators.minLength(2)]],
          nr:  [this.firma?.nr, [Validators.required, Validators.minLength(2)]],
          cui:  [this.firma?.CUI, [Validators.required, Validators.minLength(2)]],
          rep:  [this.firma?.rep, [Validators.required, Validators.minLength(2)]],
          telefon:  [this.firma?.telefon, [Validators.required, Validators.minLength(2)]], 
          codCaen:  [this.firma?.codCaen, [Validators.required, Validators.minLength(1)]], 
          dataPlatiiSalariului:  [this.firma?.dataPlatiiSalariului, [Validators.required, Validators.minLength(1)]],           
        });
      },
      err=> console.log('some exception appeared '+err),      
    );    
  }

  goBack(){
    this.router.navigate(['/firme']);
  }

  save() {
 console.log('cod caen '+this.firmeGroup.get('codCaen').value);
    let updatedFirma = new Firma();     
    updatedFirma.CUI = this.firmeGroup.get('cui').value,
    updatedFirma.nr = this.firmeGroup.get('nr').value,
    updatedFirma.nume = this.firmeGroup.get('firmaName').value,
    updatedFirma.regComert = this.firmeGroup.get('regComert').value,
    updatedFirma.rep = this.firmeGroup.get('rep').value,
    updatedFirma.sediu = this.firmeGroup.get('sediu').value,
    updatedFirma.telefon = this.firmeGroup.get('telefon').value,
    updatedFirma.codCaen = this.firmeGroup.get('codCaen').value,
    updatedFirma.dataPlatiiSalariului = this.firmeGroup.get('dataPlatiiSalariului').value,

    this.firmeService.actualizeazaFirma(this.firmaId, updatedFirma);    
    this.router.navigate(['/firme']);
  }

}
