import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICandidatLocal,  CANDIDAT_ATRIBUT } from '../candidat';
import {
  AngularFirestore,
  AngularFirestoreDocument

} from '@angular/fire/firestore';
import { SalariatiService } from '../candidati.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-candidati-adaugare',
  templateUrl: './candidati-adaugare.component.html',
  styleUrls: ['./candidati-adaugare.component.css']
})
export class CandidatiAdaugareComponent  implements OnInit {
  candidatiGroup: FormGroup;
  candidat: ICandidatLocal;
  atributCandidat;
  codFirma: string;
  errorMessage: string;

  // judet = 'judet';

  constructor(
    private router: Router,
    private salariatiService: SalariatiService,
    private fb: FormBuilder,
    public auth: AuthService
    ) {

    }

  ngOnInit(): void {
  
    console.log('get users object fom :' + this.auth.userEmail);
    this.auth.getLoggedInUser(this.auth.userEmail).subscribe({
      next: templates => {
        this.codFirma = templates?.company;
      },
      error: err => {
        this.errorMessage = err;
      }
    });

    this.atributCandidat = CANDIDAT_ATRIBUT;
    //  this.firmeGroup = new FormGroup({
    this.candidatiGroup = this.fb.group({
      nrContract:     ['', [Validators.required, Validators.minLength(3)]],
      dataContract:     ['', [Validators.required]],
      numeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      prenumeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      // candidatiEmail: ['', [Validators.required, Validators.email]],
      marca: ['', [Validators.required]],
      tara: ['Romania', [Validators.required, Validators.minLength(2)]],
      judet: ['Timis', [Validators.required, Validators.minLength(2)]],
      localitate: ['', [Validators.required, Validators.minLength(3)]],
      strada: ['', [Validators.required, Validators.minLength(3)]],
      numar: ['', [Validators.required]],
      bloc: ['', ],
      scara: ['', ],
      etaj: ['', ],
      apartament: ['', ],
      actIdentitate: ['CI', [Validators.required]],
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
      dataSfarsitCimDeterminat: ['', []],

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

      durataConcediuDeOdihna: ['', [Validators.required]],
      salariulDeBazaBrut: ['', [Validators.required]],
      perioadaDeProba: ['', [Validators.required]],
      perioadaDePreavizInCazulConcedierii: ['20', [Validators.required]],
      perioadaDePreavizInCazulDemisiei: ['20', [Validators.required]],
      anulCurent: ['', [Validators.required]],
      nrInregCerereDeAngajare: ['', [Validators.required]],
      nrInregDeclaratieFunctieDeBaza: ['', [Validators.required]],
      nrInregDeclaratiePersoaneInIntretinere: ['', [Validators.required]],
      nrInregDeclaratieCasaDeSanatate: ['', [Validators.required]],
      nrInregDeclLuareLaCunostintaROI: ['', [Validators.required]],
      nrInregPlanificareaZilelorDeCO: ['', [Validators.required]],
      nrZileCOConveniteInAnulCurent: ['21', [Validators.required]],
      platitorDeImpozit: ['', [Validators.required]],
      
      functiaDeBaza: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      parolaWeb: ['', [Validators.required]],
      locatiePlata: ['', [Validators.required]],
      bancaAngajator: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      tipContract: ['', [Validators.required]],
      sablonContractNexus: ['', [Validators.required]],
      angajatorNexus: ['', [Validators.required]],
      cuiAngajator: ['', [Validators.required]],
      cuiLocDeMunca: ['', [Validators.required]],
      ticheteDeMasa: ['', [Validators.required]],
      studiiSCED: ['', [Validators.required]]
    });
  }

  goBack() {
    this.router.navigate(['/angajati']);
  }

  save() {
//avem aici logged in user company .. in ce forma oare?..
    // this.auth.userCompany

    const data: ICandidatLocal = {
      uid: null,
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
      nrLuniSaptamaniAni: this.candidatiGroup.get('nrLuniSaptamaniAni').value,
      dataInceputCimDeteriminat: this.candidatiGroup.get('dataInceputCimDeteriminat').value,
      dataSfarsitCimDeterminat: this.candidatiGroup.get('dataSfarsitCimDeterminat').value,
      departament: this.candidatiGroup.get('departament').value,
      locDeMunca: this.candidatiGroup.get('locDeMunca').value,
      functia: this.candidatiGroup.get('functia').value,
      codCOR: this.candidatiGroup.get('codCOR').value,
      normaIntreagaDeLucruOreZi: this.candidatiGroup.get('normaIntreagaDeLucruOreZi').value,
      normaIntreagaDeLucruOreSapt: this.candidatiGroup.get('normaIntreagaDeLucruOreSapt').value,
      normaPartiala: this.candidatiGroup.get('normaPartiala').value,
      repartizareProgramPtNormaPartiala: this.candidatiGroup.get('repartizareProgramPtNormaPartiala').value,
      repartizareTimpMunca: this.candidatiGroup.get('repartizareTimpMunca').value,
      tipIntervalRepartizare: this.candidatiGroup.get('tipIntervalRepartizare').value,

      durataConcediuDeOdihna: this.candidatiGroup.get('durataConcediuDeOdihna').value,
      salariulDeBazaBrut: this.candidatiGroup.get('salariulDeBazaBrut').value,
      perioadaDeProba: this.candidatiGroup.get('perioadaDeProba').value,
      perioadaDePreavizInCazulConcedierii: this.candidatiGroup.get('perioadaDePreavizInCazulConcedierii').value,
      perioadaDePreavizInCazulDemisiei: this.candidatiGroup.get('perioadaDePreavizInCazulDemisiei').value,
      anulCurent: this.candidatiGroup.get('anulCurent').value,
      nrInregCerereDeAngajare: this.candidatiGroup.get('nrInregCerereDeAngajare').value,
      nrInregDeclaratieFunctieDeBaza: this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').value,
      nrInregDeclaratiePersoaneInIntretinere: this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').value,
      nrInregDeclaratieCasaDeSanatate: this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').value,
      nrInregDeclLuareLaCunostintaROI: this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').value,
      nrInregPlanificareaZilelorDeCO: this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').value,
      nrZileCOConveniteInAnulCurent: this.candidatiGroup.get('nrZileCOConveniteInAnulCurent').value,
      platitorDeImpozit: this.candidatiGroup.get('platitorDeImpozit').value,

      functiaDeBaza: this.candidatiGroup.get('functiaDeBaza').value,
      mail: this.candidatiGroup.get('mail').value,
      parolaWeb: this.candidatiGroup.get('parolaWeb').value,
      locatiePlata: this.candidatiGroup.get('locatiePlata').value,
      bancaAngajator: this.candidatiGroup.get('bancaAngajator').value,
      iban: this.candidatiGroup.get('iban').value,
      tipContract: this.candidatiGroup.get('tipContract').value,
      sablonContractNexus: this.candidatiGroup.get('sablonContractNexus').value,
      angajatorNexus: this.candidatiGroup.get('angajatorNexus').value,
      cuiAngajator: this.candidatiGroup.get('cuiAngajator').value,
      cuiLocDeMunca: this.candidatiGroup.get('cuiLocDeMunca').value,
      ticheteDeMasa: this.candidatiGroup.get('ticheteDeMasa').value,
      studiiSCED: this.candidatiGroup.get('studiiSCED').value,
      codFirma: this.codFirma
    };
    this.salariatiService.addCandidat(data);
    console.log('Salariat ', JSON.stringify(data));
    this.router.navigate(['/candidati']);
  }
}
