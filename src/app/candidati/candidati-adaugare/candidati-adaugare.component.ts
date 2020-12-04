import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICandidat, ICandidatLocal, CANDIDAT_ATRIBUT } from '../candidat';
import {
  AngularFirestore,
  AngularFirestoreDocument

} from '@angular/fire/firestore';
import { CandidatiService } from '../candidati.service';
@Component({
  selector: 'app-candidati-adaugare',
  templateUrl: './candidati-adaugare.component.html',
  styleUrls: ['./candidati-adaugare.component.css']
})
export class CandidatiAdaugareComponent  implements OnInit {
  candidatiGroup: FormGroup;
  candidat: ICandidat;
  atributCandidat;

  judet = 'judet';

  constructor(
    private router: Router,
    private candidatiService: CandidatiService,
    private fb: FormBuilder
    ) {

    }

  ngOnInit(): void {
    this.atributCandidat = CANDIDAT_ATRIBUT;
    //  this.firmeGroup = new FormGroup({
    this.candidatiGroup = this.fb.group({
      nrContract:     ['', [Validators.required, Validators.minLength(3)]],
      dataContract:     ['', [Validators.required]],
      numeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      prenumeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      // candidatiEmail: ['', [Validators.required, Validators.email]],
      marca: ['', [Validators.required, Validators.minLength(3)]],
      tara: ['', [Validators.required, Validators.minLength(3)]],
      judet: ['', [Validators.required, Validators.minLength(3)]],
      localitate: ['', [Validators.required, Validators.minLength(3)]],
      strada: ['', [Validators.required, Validators.minLength(3)]],
      numar: ['', [Validators.required]],
      bloc: ['', ],
      scara: ['', ],
      etaj: ['', ],
      apartament: ['', ],
      actIdentitate: ['', [Validators.required]],
      serieCI: ['', [Validators.required]],
      numarCI: ['', [Validators.required]],
      unitateaCareAEliberatCI: ['', [Validators.required, Validators.minLength(3)]],
      dataEliberareCI: ['', [Validators.required]],
      dataExpirareCI: ['', [Validators.required]],
      cnp: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      dataAngajare: ['', []],
      dataAngajareNedeterminat: ['', []],
      nrLuniSaptamaniAni: ['', []],
      dataInceputCimDeteriminat: ['', []],
      dataSfarsitCimDeterinat: ['', []],

      departament: ['', [Validators.required]],
      locDeMunca: ['', [Validators.required]],
      functia: ['', [Validators.required]],
      codCOR: ['', [Validators.required]],
      normaIntreagaDeLucruOreZi: ['', [Validators.required]],
      normaIntreagaDeLucruOreSapt: ['', [Validators.required]],
      normaPartiala: ['', [Validators.required]],
      repartizareProgramPtNormaPartiala: ['', [Validators.required]],
      repartizareTimpMunca: ['', [Validators.required]],
      tipIntervalRepartizare: ['', [Validators.required]],
    });
  }

  goBack() {
    this.router.navigate(['/angajati']);
  }

  save() {
    const data: ICandidatLocal = {
      nrContract: this.candidatiGroup.get('nrContract').value,
      dataContract: this.candidatiGroup.get('dataContract').value,
      numeSalariat: this.candidatiGroup.get('numeSalariat').value,
      prenumeSalariat: this.candidatiGroup.get('prenumeSalariat').value,
      marca: this.candidatiGroup.get('marca').value,
      tara: this.candidatiGroup.get('tara').value,
      judet: this.candidatiGroup.get('judet').value,
      localitate: this.candidatiGroup.get('localitate').value,
      strada: this.candidatiGroup.get('strada').value,
      numar: this.candidatiGroup.get('numar').value,
      bloc: this.candidatiGroup.get('bloc').value,
      scara: this.candidatiGroup.get('scara').value,
      etaj: this.candidatiGroup.get('etaj').value,
      apartament: this.candidatiGroup.get('apartament').value,
      actIdentitate: this.candidatiGroup.get('actIdentitate').value,
      serieCI: this.candidatiGroup.get('serieCI').value,
      numarCI: this.candidatiGroup.get('numarCI').value,
      unitateaCareAEliberatCI: this.candidatiGroup.get('unitateaCareAEliberatCI').value,
      dataEliberareCI: this.candidatiGroup.get('dataEliberareCI').value,
      dataExpirareCI: this.candidatiGroup.get('dataExpirareCI').value,
      cnp: this.candidatiGroup.get('cnp').value,
      dataAngajare: this.candidatiGroup.get('dataAngajare').value,
      dataAngajareNedeterminat: this.candidatiGroup.get('dataAngajareNedeterminat').value,
      nrLuniSaptamaniAni: this.candidatiGroup.get('cnrLuniSaptamaniAninp').value,
      dataInceputCimDeteriminat: this.candidatiGroup.get('dataInceputCimDeteriminat').value,
      dataSfarsitCimDeterinat: this.candidatiGroup.get('dataSfarsitCimDeterinat').value,
      departament: this.candidatiGroup.get('departament').value,
      locDeMunca: this.candidatiGroup.get('locDeMunca').value,
      functia: this.candidatiGroup.get('functia').value,
      codCOR: this.candidatiGroup.get('codCOR').value,
      normaIntreagaDeLucruOreZi: this.candidatiGroup.get('normaIntreagaDeLucruOreZi').value,
      normaIntreagaDeLucruOreSapt: this.candidatiGroup.get('normaIntreagadeLucruOreSapt').value,
      normaPartiala: this.candidatiGroup.get('normaPartiala').value,
      repartizareProgramPtNormaPartiala: this.candidatiGroup.get('repartizareProgramPtNormaPartiala').value,
      repartizareTimpMunca: this.candidatiGroup.get('repartizareTimpMunca').value,
      tipIntervalRepartizare: this.candidatiGroup.get('tipIntervalRepartizare').value,
      
    };
    this.candidatiService.addCandidat(data);
    console.log('Candidat ', JSON.stringify(data));
    this.router.navigate(['/candidati']);
  }
}
