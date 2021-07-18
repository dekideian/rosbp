import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Candidat, CANDIDAT_ATRIBUT, ICandidatLocal } from '../candidat';
import { SalariatiService } from '../candidati.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common'
import * as moment from 'moment';
@Component({
  selector: 'app-candidati-editare',
  templateUrl: './candidati-editare.component.html',
  styleUrls: ['./candidati-editare.component.css']
})
export class CandidatiEditareComponent implements OnInit {
  isLoading=false;
  salariatId: string;
  salariat: Candidat;
  errorMessage: string;
  candidatiGroup: FormGroup;
  atributCandidat;
  listaJudete;
  coduriCor: any[];
  coduriCorSelectate: any[];
  codCorSiFunctia;
  defaultCheckboxValue;
  defaultFunctiaDeBazaValue;
  defaultTicheteDeMasaValue;
  defaultFunctieDeConducere;
  defaultContractDeterminat = false;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private salariatiService: SalariatiService,
    private dateAdapter: DateAdapter<Date>
    ) {
      this.dateAdapter.setLocale('ro-RO'); //dd/MM/yyyy
      
     }

  ngOnInit(): void {

    
    this.atributCandidat = CANDIDAT_ATRIBUT;    
    this.listaJudete = [
      "Alba",
      "Arad",
      "Arges",
      "Bacau",
      "Bihor",
      "Bistrita-Nasaud",
      "Botosani",
      "Brasov",
      "Braila",
      "Buzau",
      "Caras-Severin",
      "Calarasi",
      "Cluj",
      "Constanţa",
      "Covasna",
      "Dambovita",
      "Dolj",
      "Galati",
      "Giurgiu",
      "Gorj",
      "Harghita",
      "Hunedoara",
      "Ialomita",
      "Iasi",
      "Ilfov",
      "Maramureş",
      "Mehedinti",
      "Mures",
      "Neamt",
      "Olt",
      "Prahova",
      "Satu Mare",
      "Salaj",
      "Sibiu",
      "Suceava",
      "Teleorman",
      "Timis",
      "Tulcea",
      "Valcea",
      "Vaslui",
      "Vrancea"];

    this.salariatId = this.route.snapshot.paramMap.get('id');
    this.salariatiService.getCoduriCor().subscribe({
      next: coduriCor => {
        this.coduriCor = coduriCor;
        this.coduriCorSelectate = coduriCor;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
    this.salariatiService.getCandidat(this.salariatId).subscribe({
      next: salariat => {
        this.codCorSiFunctia = salariat.codCOR;
        this.salariat = salariat;
                        
        this.candidatiGroup = this.fb.group({
          nrContract: [this.salariat.nrContract, [Validators.required, Validators.minLength(1)]],
          dataContract: [convertDate(this.salariat.dataContract), [Validators.required]],
          numeSalariat: [this.salariat.numeSalariat, [Validators.required, Validators.minLength(3)]],
          prenumeSalariat: [this.salariat.prenumeSalariat, [Validators.required, Validators.minLength(3)]],
          marca: [this.salariat.marca, []],
          adresa: [this.salariat.adresa, [Validators.required, Validators.minLength(1)]],
          tara: [this.salariat.tara, [Validators.required, Validators.minLength(2)]],
          judet: [this.salariat.judet, [Validators.required, Validators.minLength(2)]],
          localitate: [this.salariat.localitate, [Validators.required, Validators.minLength(3)]],
          strada: [this.salariat.strada, [Validators.required, Validators.minLength(3)]],
          numar: [this.salariat.numar, [Validators.required]],
          bloc: [this.salariat.bloc,],
          scara: [this.salariat.scara,],
          etaj: [this.salariat.etaj,],
          apartament: [this.salariat.apartament,],
          actIdentitate: [this.salariat.actIdentitate, [Validators.required]],
          serieCI: [this.salariat.serieCI, [Validators.required]],
          numarCI: [this.salariat.numarCI, [Validators.required]],
          unitateaCareAEliberatCI: [this.salariat.unitateaCareAEliberatCI, [Validators.required, Validators.minLength(3)]],
          dataEliberareCI: [convertDate(this.salariat.dataEliberareCI), [Validators.required]],
          dataExpirareCI: [convertDate(this.salariat.dataExpirareCI), [Validators.required]],
          cnp: [this.salariat.cnp, [Validators.required, cnpControlNumber]],
          dataAngajare: [convertDate(this.salariat.dataAngajare), [Validators.required]],
          dataAngajareNedeterminat: [convertDate(this.salariat.dataAngajareNedeterminat), [Validators.required]],
          nrLuniSaptamaniAni: [this.salariat.nrLuniSaptamaniAni, [Validators.required]],
          dataInceputCimDeterminat: [convertDate(this.salariat.dataInceputCimDeterminat), [Validators.required]],
          dataSfarsitCimDeterminat: [convertDate(this.salariat.dataSfarsitCimDeterminat), [Validators.required]],
          contractDeterminat: [this.salariat.dataAngajareNedeterminat !== '-' ? false : true, []],          
          artContractDeterminat: [this.salariat.artContractDeterminat, []],

          departament: [this.salariat.departament, []],
          locDeMunca: [this.salariat.locDeMunca, [Validators.required]],
          codCOR: [this.salariat.codCOR, [Validators.required]],
          functieDeConducere: [this.salariat.functieDeConducere],
          normaIntreaga: [this.salariat.normaIntreagaDeLucruOreZi !== '-' ? true : false, []],
          
          normaIntreagaDeLucruOreZi: [this.salariat.normaIntreagaDeLucruOreZi, [Validators.required]],
          normaIntreagaDeLucruOreSapt: [this.salariat.normaIntreagaDeLucruOreSapt, [Validators.required]],
          normaPartiala: [this.salariat.normaPartiala, [Validators.required]],
          repartizareProgramPtNormaPartiala: [this.salariat.repartizareProgramPtNormaPartiala, [Validators.required]],
          repartizareTimpMunca: [this.salariat.repartizareTimpMunca, [Validators.required]],
          tipIntervalRepartizare: [this.salariat.tipIntervalRepartizare, [Validators.required]],

          durataConcediuDeOdihna: [this.salariat.durataConcediuDeOdihna, [Validators.required]],
          salariulDeBazaBrut: [this.salariat.salariulDeBazaBrut, [Validators.required]],
          perioadaDeProba: [this.salariat.perioadaDeProba, [Validators.required]],
          perioadaDePreavizInCazulConcedierii: [this.salariat.perioadaDePreavizInCazulConcedierii, [Validators.required]],
          perioadaDePreavizInCazulDemisiei: [this.salariat.perioadaDePreavizInCazulDemisiei, [Validators.required]],
          // anulCurent: ['', [Validators.required]],
          nrInregCerereDeAngajare: [this.salariat.nrInregCerereDeAngajare, [Validators.required]],
          nrInregDeclaratieFunctieDeBaza: [this.salariat.nrInregDeclaratieFunctieDeBaza, [Validators.required]],
          nrInregDeclaratiePersoaneInIntretinere: [this.salariat.nrInregDeclaratiePersoaneInIntretinere, [Validators.required]],
          nrInregDeclaratieCasaDeSanatate: [this.salariat.nrInregDeclaratieCasaDeSanatate, [Validators.required]],
          nrInregDeclLuareLaCunostintaROI: [this.salariat.nrInregDeclLuareLaCunostintaROI, [Validators.required]],
          nrInregPlanificareaZilelorDeCO: [this.salariat.nrInregPlanificareaZilelorDeCO, [Validators.required]],
          nrZileCOConveniteInAnulCurent: [this.salariat.nrZileCOConveniteInAnulCurent, [Validators.required]],
          platitorDeImpozit: [this.salariat.platitorDeImpozit === 'da' ? 'true' : 'false', []],

          functiaDeBaza: [this.salariat.functiaDeBaza==='da'? 'true': 'false', []],
          mail: [this.salariat.mail, [Validators.required, Validators.email]],
          parolaWeb: [this.salariat.parolaWeb, [Validators.required]],
          locatiePlata: [this.salariat.locatiePlata, [Validators.required]],
          bancaAngajator: [this.salariat.bancaAngajator, [Validators.required]],
          iban: [this.salariat.iban, [Validators.required]],
          tipContract: [this.salariat.tipContract, [Validators.required]],
          sablonContractNexus: [this.salariat.sablonContractNexus, [Validators.required]],
          angajatorNexus: [this.salariat.angajatorNexus, [Validators.required]],
          cuiAngajator: [this.salariat.cuiAngajator, [Validators.required]],
          cuiLocDeMunca: [this.salariat.cuiLocDeMunca, [Validators.required]],
          ticheteDeMasa: [this.salariat.ticheteDeMasa==='da'? 'true':'false', []],
          studiiSCED: [this.salariat.studiiSCED, [Validators.required]],
          nrInregLocuriVacante: [this.salariat.nrInregLocuriVacante, [Validators.required]],
          nrInregOcupareLocuriVacante: [this.salariat.nrInregOcupareLocuriVacante, [Validators.required]],
          nrInregInstiintareIncadrare: [this.salariat.nrInregInstiintareIncadrare, [Validators.required]],
        });
        this.defaultCheckboxValue = this.salariat.platitorDeImpozit;
        this.defaultFunctiaDeBazaValue = this.salariat.functiaDeBaza;
        this.defaultTicheteDeMasaValue = this.salariat.ticheteDeMasa;
        this.defaultFunctieDeConducere = this.salariat.functieDeConducere;
        this.candidatiGroup.get('codCOR').setValue(this.salariat.codCOR);
        this.disableNrContractSiAltele();
        // console.log('Norma intreaga ' + this.candidatiGroup.get('normaIntreaga').value);
        // console.log('Salariatul are numele ' + this.salariat.codCOR + ' - ' + this.salariat.functia);
      },
      error: err => {
        this.errorMessage = err;
      }
    });

  }

  disableNrContractSiAltele() {
   // this.candidatiGroup.get('nrContract').disable();
    // this.candidatiGroup.get('nrInregCerereDeAngajare').disable();
    // this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').disable();
    // this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').disable();
    // this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').disable();
    // this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').disable();
    // this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').disable();
  }

  // Receive user input and send to search method**
  onKey(value) {
    // console.log('Cautam dupa valoarea ' + value)
    this.coduriCorSelectate = this.search(value);
  }
  // Filter the functions list and send back to populate the selected function**
  search(value: string) {
    let filter = value.toLowerCase();
    return this.coduriCor.filter(option => option.cod.startsWith(filter) ||
      option.nume.toLowerCase().includes(filter));
  }

  onValidCnp(value) {

    if (!this.candidatiGroup.get('cnp').errors?.cnpvalid) {
      let newPass = value.toString().substring(value.toString().length - 6);      

      this.candidatiGroup.get('parolaWeb').setValue(newPass);
    }
  }

  setNrInregCerereDeAngajare() {
    let val = +this.candidatiGroup.get('nrInregCerereDeAngajare').value;  
    this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').setValue(val+1);
    this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').setValue(val+2);
    this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').setValue(val+3);
    this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').setValue(val+4);
    this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').setValue(val+5);
  }

  platitorDeImpozit(): string {
    if (this.candidatiGroup.get('platitorDeImpozit').value === true) {
      return "da";
    }
    return "nu";
  }
  functiaDeBaza(): string {
    if (this.candidatiGroup.get('functiaDeBaza').value === true) {
      return "da";
    }
    return "nu";
  }
  ticheteDeMasa(): string {
    if (this.candidatiGroup.get('ticheteDeMasa').value === true) {
      return "da";
    }
    return "nu";
  }
  dateContractDeMuncaValide() {
    if (this.isValid('dataContract')) {
      return true;
    } else {
      return false;
    }
  }
  dateContractDeMuncaInvalide() {
    if ((this.isInvalid('dataContract'))
    ) {
      return true;
    } else {
      return false;
    }
  }
  informatiiSalariatValid() {
    if (this.isValid('numeSalariat') &&
      this.isValid('prenumeSalariat') &&      
      this.isValid('adresa') &&
      // this.isValid('judet') &&
      // this.isValid('localitate') &&
      // this.isValid('strada') &&
      // this.isValid('numar') &&
      // this.isValid('bloc') &&
      // this.isValid('scara') &&
      // this.isValid('etaj') &&
      // this.isValid('apartament') &&
      this.isValid('actIdentitate') &&
      this.isValid('serieCI') &&
      this.isValid('numarCI') &&
      this.isValid('unitateaCareAEliberatCI') &&
      this.isValid('dataEliberareCI') &&
      this.isValid('dataExpirareCI') &&
      this.isValid('cnp')
    ) {

      return true;
    } else {
      //  console.log('informatii salariat nu e valid  ')
      return false;
    }
  }
  informatiiSalariatInvalid() {
    if (this.isInvalid('numeSalariat') ||
      this.isInvalid('prenumeSalariat') ||      
      this.isInvalid('adresa') ||
      // this.isInvalid('judet') ||
      // this.isInvalid('localitate') ||
      // this.isInvalid('strada') ||
      // this.isInvalid('numar') ||
      // this.isInvalid('bloc') ||
      // this.isInvalid('scara') ||
      // this.isInvalid('etaj') ||
      // this.isInvalid('apartament') ||
      this.isInvalid('actIdentitate') ||
      this.isInvalid('serieCI') ||
      this.isInvalid('numarCI') ||
      this.isInvalid('unitateaCareAEliberatCI') ||
      this.isInvalid('dataEliberareCI') ||
      this.isInvalid('dataExpirareCI') ||
      this.isInvalid('cnp')
    ) {
      //console.log('informatii salariat invalid  ')
      return true;
    } else {
      // console.log('informatii salariat nu e invalid  ')
      return false;
    }
  }

  durataMunciiValide() {
    if (this.candidatiGroup.get('normaIntreaga').value) {
      if (this.isValid('normaIntreagaDeLucruOreZi') &&
        this.isValid('normaIntreagaDeLucruOreSapt')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.isValid('repartizareProgramPtNormaPartiala') &&
        this.isValid('repartizareTimpMunca') &&
        this.isValid('tipIntervalRepartizare')
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  durataMunciiInvalide() {
    if (this.candidatiGroup.get('normaIntreaga').value) {
      if (this.isInvalid('normaIntreagaDeLucruOreZi') ||
        this.isInvalid('normaIntreagaDeLucruOreSapt')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.isInvalid('repartizareProgramPtNormaPartiala') ||
        this.isInvalid('repartizareTimpMunca') ||
        this.isInvalid('tipIntervalRepartizare')
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  durataContractValid() {
    // console.log('durata contract valid '+ this.candidatiGroup.get('contractDeterminat').value+ ' data ang valid? : '+this.isValid('dataAngajare'))
    if (this.candidatiGroup.get('contractDeterminat').value) {
      
      if (this.isValid('dataAngajare') &&
        this.isValid('nrLuniSaptamaniAni') &&
        this.isValid('dataInceputCimDeterminat') &&
        this.isValid('dataSfarsitCimDeterminat')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.isValid('dataAngajareNedeterminat')) {
        return true;
      } else {
        return false;
      }
    }
  }

  durataContractInvalid() {
    if (this.candidatiGroup.get('contractDeterminat').value) {
      if (this.isInvalid('dataAngajare') ||
        this.isInvalid('nrLuniSaptamaniAni') ||
        this.isInvalid('dataInceputCimDeterminat') ||
        this.isInvalid('dataSfarsitCimDeterminat')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.isInvalid('dataAngajareNedeterminat')) {
        return true;
      } else {
        return false;
      }
    }
  }



  loculSiFelulMunciiValid() {
    if (
      this.isValid('locDeMunca') &&
      this.isValid('codCOR')
    ) {
      return true;
    } else {
      return false;
    }
  }
  loculSiFelulMunciiInvalid() {
    if (
      this.isInvalid('locDeMunca') ||
      this.isInvalid('codCOR')
    ) {
      return true;
    } else {
      return false;
    }
  }
  concediiSiSalariiValid() {
    if (this.isValid('durataConcediuDeOdihna') &&
      this.isValid('salariulDeBazaBrut')
    ) {
      return true;
    } else {
      return false;
    }
  }
  concediiSiSalariiInvalid() {
    if (this.isInvalid('durataConcediuDeOdihna') ||
      this.isInvalid('salariulDeBazaBrut')

    ) {
      return true;
    } else {
      return false;
    }
  }
  alteClauzeValid() {
    if (this.isValid('perioadaDeProba') &&
      this.isValid('perioadaDePreavizInCazulConcedierii') &&
      this.isValid('perioadaDePreavizInCazulDemisiei')
    ) {
      return true;
    } else {
      return false;
    }
  }
  alteClauzeInvalid() {
    if (this.isInvalid('perioadaDeProba') ||
      this.isInvalid('perioadaDePreavizInCazulConcedierii') ||
      this.isInvalid('perioadaDePreavizInCazulDemisiei')
    ) {
      return true;
    } else {
      return false;
    }
  }
  nrOrdineValid() {

    if (
      this.isValid('nrZileCOConveniteInAnulCurent') &&
      this.isValid('nrInregLocuriVacante') &&
      this.isValid('nrInregOcupareLocuriVacante') &&
      this.isValid('nrInregInstiintareIncadrare') 
    ) {
      return true;
    } else {
      return false;
    }
  }
  nrOrdineInvalid() {
    if (
      this.isInvalid('nrZileCOConveniteInAnulCurent') ||
      this.isInvalid('nrInregLocuriVacante') ||
      this.isInvalid('nrInregOcupareLocuriVacante') ||
      this.isInvalid('nrInregInstiintareIncadrare')       
    ) {
      return true;
    } else {
      return false;
    }
  }

  diverseValid() {

    if (
      this.isValid('mail') &&
      this.isValid('parolaWeb') &&
      this.isValid('locatiePlata') &&
      this.isValid('iban') &&
      this.isValid('tipContract') &&
      this.isValid('sablonContractNexus') &&
      this.isValid('angajatorNexus') &&
      this.isValid('cuiAngajator') &&
      this.isValid('ticheteDeMasa') &&
      this.isValid('studiiSCED')
    ) {
      return true;
    } else {
      return false;
    }
  }
  diverseInvalid() {
    if (
      this.isInvalid('mail') ||
      this.isInvalid('parolaWeb') ||
      this.isInvalid('locatiePlata') ||
      this.isInvalid('iban') ||
      this.isInvalid('tipContract') ||
      this.isInvalid('sablonContractNexus') ||
      this.isInvalid('angajatorNexus') ||
      this.isInvalid('cuiAngajator') ||
      this.isInvalid('ticheteDeMasa') ||
      this.isInvalid('studiiSCED')
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValid(fieldName: string) {
    if (this.candidatiGroup.get(fieldName).valid &&
      (this.candidatiGroup.get(fieldName).touched || this.candidatiGroup.get(fieldName).value)) {
      return true;
    } else {

      return false;
    }
  }
  isInvalid(fieldName: string) {
    if (this.candidatiGroup.get(fieldName).touched && this.candidatiGroup.get(fieldName).invalid) {
      return true;
    } else {
      return false;
    }
  }

  allCategoriesAreValid() {
    if (this.dateContractDeMuncaValide() &&
      this.informatiiSalariatValid() &&
      this.durataContractValid() &&
      this.loculSiFelulMunciiValid() &&
      this.durataMunciiValide() &&
      this.concediiSiSalariiValid() &&
      this.alteClauzeValid &&
      this.nrOrdineValid() &&
      this.diverseValid
    ) {
      return true;
    } else {
      return false;
    }
  }
  gasesteFunctiePtCod(codCOR: string) {
    return this.coduriCor.filter(unCod => unCod.cod === codCOR)[0].nume;
  }
  save() {
    // let asdf = new Date( )
    // let newDate = (moment(asdf)).format("DD/MM/YYYY");
    

    this.candidatiGroup.disable();
    this.isLoading = true;
    let codCorAles = this.candidatiGroup.get('codCOR').value;
    let functieCorAles = this.gasesteFunctiePtCod(codCorAles);
    const data: ICandidatLocal = {
      uid: null,
      nrContract: this.candidatiGroup.get('nrContract').value,
      dataContract: convertDateToFormat(this.candidatiGroup.get('dataContract').value),
      numeSalariat: this.candidatiGroup.get('numeSalariat').value,
      prenumeSalariat: this.candidatiGroup.get('prenumeSalariat').value,
      marca: this.candidatiGroup.get('marca').value,
      adresa: this.candidatiGroup.get('adresa').value,
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
      dataEliberareCI: convertDateToFormat(this.candidatiGroup.get('dataEliberareCI').value),
      dataExpirareCI: convertDateToFormat(this.candidatiGroup.get('dataExpirareCI').value),
      cnp: this.candidatiGroup.get('cnp').value,
      dataAngajare: this.candidatiGroup.get('contractDeterminat').value ? convertDateToFormat(this.candidatiGroup.get('dataAngajare').value) : '-',
      dataAngajareNedeterminat: this.candidatiGroup.get('contractDeterminat').value ? '-' : convertDateToFormat(this.candidatiGroup.get('dataAngajareNedeterminat').value),
      nrLuniSaptamaniAni: this.candidatiGroup.get('contractDeterminat').value ? this.candidatiGroup.get('nrLuniSaptamaniAni').value : '-',
      dataInceputCimDeterminat: this.candidatiGroup.get('contractDeterminat').value ? convertDateToFormat(this.candidatiGroup.get('dataInceputCimDeterminat').value) : '-',
      dataSfarsitCimDeterminat: this.candidatiGroup.get('contractDeterminat').value ? convertDateToFormat(this.candidatiGroup.get('dataSfarsitCimDeterminat').value) : '-',
      departament: this.candidatiGroup.get('departament').value,
      locDeMunca: this.candidatiGroup.get('locDeMunca').value,
      functia: functieCorAles,
      codCOR: codCorAles,
      functieDeConducere: this.candidatiGroup.get('functieDeConducere').value,      
      normaIntreagaDeLucruOreZi: this.candidatiGroup.get('normaIntreaga').value ? this.candidatiGroup.get('normaIntreagaDeLucruOreZi').value : '-',
      normaIntreagaDeLucruOreSapt: this.candidatiGroup.get('normaIntreaga').value ? this.candidatiGroup.get('normaIntreagaDeLucruOreSapt').value : '-',
      normaPartiala: this.candidatiGroup.get('normaIntreaga').value ? '-' : this.candidatiGroup.get('normaPartiala').value,
      repartizareProgramPtNormaPartiala: this.candidatiGroup.get('normaIntreaga').value ? '-' : this.candidatiGroup.get('repartizareProgramPtNormaPartiala').value,
      repartizareTimpMunca: this.candidatiGroup.get('normaIntreaga').value ? '-' : this.candidatiGroup.get('repartizareTimpMunca').value,
      tipIntervalRepartizare: this.candidatiGroup.get('normaIntreaga').value ? '-' : this.candidatiGroup.get('tipIntervalRepartizare').value,

      artContractDeterminat: this.candidatiGroup.get('contractDeterminat').value?this.candidatiGroup.get("artContractDeterminat").value:null,

      durataConcediuDeOdihna: this.candidatiGroup.get('durataConcediuDeOdihna').value,
      salariulDeBazaBrut: this.candidatiGroup.get('salariulDeBazaBrut').value,
      perioadaDeProba: this.candidatiGroup.get('perioadaDeProba').value,
      perioadaDePreavizInCazulConcedierii: this.candidatiGroup.get('perioadaDePreavizInCazulConcedierii').value,
      perioadaDePreavizInCazulDemisiei: this.candidatiGroup.get('perioadaDePreavizInCazulDemisiei').value,
      anulCurent: new Date().getFullYear() + '',
      nrInregCerereDeAngajare: this.candidatiGroup.get('nrInregCerereDeAngajare').value,
      nrInregDeclaratieFunctieDeBaza: this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').value,
      nrInregDeclaratiePersoaneInIntretinere: this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').value,
      nrInregDeclaratieCasaDeSanatate: this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').value,
      nrInregDeclLuareLaCunostintaROI: this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').value,
      nrInregPlanificareaZilelorDeCO: this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').value,
      nrZileCOConveniteInAnulCurent: this.candidatiGroup.get('nrZileCOConveniteInAnulCurent').value,
      platitorDeImpozit: this.platitorDeImpozit(),

      functiaDeBaza: this.functiaDeBaza(),
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
      ticheteDeMasa: this.ticheteDeMasa(),
      studiiSCED: this.candidatiGroup.get('studiiSCED').value,
      codFirma: this.salariat.codFirma,
      numeFirma: this.salariat.numeFirma,
      sediuFirma: this.salariat.sediuFirma,
      regComertFirma: this.salariat.regComertFirma,
      nrFirma: this.salariat.nrFirma,
      cuiFirma: this.salariat.cuiFirma,
      repFirma: this.salariat.repFirma,
      telefonFirma: this.salariat.telefonFirma,
      nrInregLocuriVacante: this.candidatiGroup.get('nrInregLocuriVacante').value,
      nrInregOcupareLocuriVacante: this.candidatiGroup.get('nrInregOcupareLocuriVacante').value,
      nrInregInstiintareIncadrare: this.candidatiGroup.get('nrInregInstiintareIncadrare').value      
    };
    this.salariatiService.actualizeazaCandidat(this.salariatId, data);
    this.isLoading = false;
    this.candidatiGroup.enable();
    this.router.navigate(['/candidati']);
  }
  goBack() {
    this.router.navigate(['/candidati']);
  }
  onLuniCompleted(nrLuni: string) {
    console.log('am pus valoarea ' + nrLuni);
    if (nrLuni !== '') {
      let nr: number = +nrLuni;
      if (nr < +3) {
        this.candidatiGroup.get('perioadaDeProba').setValue('5');
      } else if ((+3 <= nr) && (nr < +6)) {
        this.candidatiGroup.get('perioadaDeProba').setValue('15');
      } else if (nr => +6) {
        if (this.candidatiGroup.get('functieDeConducere').value) {
          this.candidatiGroup.get('perioadaDeProba').setValue('45');
        } else {
          this.candidatiGroup.get('perioadaDeProba').setValue('30');
        }
      }
    }
  }
  functieDeConducere(func) {
    let functieDeConducere = !this.candidatiGroup.get('functieDeConducere').value;
    console.log('Functie de conducere.. ' + functieDeConducere);
    if (this.candidatiGroup.get('contractDeterminat').value) {

      let contractLength = +this.candidatiGroup.get('nrLuniSaptamaniAni').value;
      console.log('avem determinat , luni: ' + contractLength);
      if (contractLength >= +6) {
        if (functieDeConducere) {
          this.candidatiGroup.get('perioadaDeProba').setValue('45');
        } else {
          this.candidatiGroup.get('perioadaDeProba').setValue('30');
        }
      }
    }
  }
}

function convertDateToFormat(selectedDate): string {  
  let actualSelectedDate = new Date(selectedDate )
  return (moment(actualSelectedDate)).format("DD/MM/YYYY");
}

function convertDate(savedDate): Date {
  var dateMomentObject = moment(savedDate, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format  
  return dateMomentObject.toDate();
}



function cnpControlNumber(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value.toString().length !== 13 || (!isCnpValid(+c.value)))) {
    return { 'cnpvalid': true }
  }
  return null;
}

function isCnpValid(value: number): boolean {
  let nrControl = 279146358279;
  let sum = 0;
  let lastDigit = value % 10;
  value = Math.floor(value / 10);

  while (value) {
    let toSumWith = nrControl % 10;
    sum += ((value % 10) * (toSumWith));
    value = Math.floor(value / 10);
    nrControl = Math.floor(nrControl / 10);
  }

  let _rest = sum % 11;
  if ((_rest === 10 && lastDigit === 1) || (sum % 11 === lastDigit)) {
    return true;
  }
  return false;
}



