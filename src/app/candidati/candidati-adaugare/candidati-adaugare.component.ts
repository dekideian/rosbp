import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ICandidatLocal,  CANDIDAT_ATRIBUT, FuncResp } from '../candidat';
// import core firebase client (required)
import firebase from '@firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument

} from '@angular/fire/firestore';
import { SalariatiService } from '../candidati.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirmeService } from 'src/app/firme/firme.service';
import { Firma } from 'src/app/firme/firma.model';
import { identifierName } from '@angular/compiler';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-candidati-adaugare',
  templateUrl: './candidati-adaugare.component.html',
  styleUrls: ['./candidati-adaugare.component.css']
})
export class CandidatiAdaugareComponent  implements OnInit {
  isLoading = false;
  candidatiGroup: FormGroup;
  nextNrContract="?";
  candidat: ICandidatLocal;
  atributCandidat;
  codFirma: string;
  numeFirma: string;
  sediuFirma: string;
  regComertFirma: string;
  nrFirma: string;
  cuiFirma: string;
  repFirma: string;
  telefonFirma: string;
  errorMessage: string;
  listaJudete;
  coduriCor: any[];
  coduriCorSelectate: any[]
  selected: 'Timis';
  defaultCheckboxValue = true;
  defaultFunctiaDeBaza = false;
  defaultTicheteDeMasa = false;
  defaultContractDeterminat = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private salariatiService: SalariatiService,
    private firmeService: FirmeService,
    private fb: FormBuilder,
    public auth: AuthService,
    private dateAdapter: DateAdapter<Date>
    ) {
      this.dateAdapter.setLocale('ro-RO'); //dd/MM/yyyy
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
            "Vrancea"
        ];
    }

    // Receive user input and send to search method**
    onKey(value) { 
      // console.log('Cautam dupa valoarea '+value)
      this.coduriCorSelectate = this.search(value);
    }
        // Filter the functions list and send back to populate the selected function**
    search(value: string) { 
      let filter = value.toLowerCase();
      return this.coduriCor.filter(option => option.cod.startsWith(filter) || 
                                                 option.nume.toLowerCase().includes(filter) );
    }
    onValidCnp(value) {
      
      if(!this.candidatiGroup.get('cnp').errors?.cnpvalid) {
        let newPass = value.toString().substring(value.toString().length-6);
        // console.log('value  '+value + 'replace with: '+newPass);

        this.candidatiGroup.get('parolaWeb').setValue(newPass);
      }
    }
  onLuniCompleted(nrLuni: string) {
    // console.log('am pus valoarea '+nrLuni);
    if(nrLuni!==''){
      let nr:number = +nrLuni;
      if(nr < +3) {
        this.candidatiGroup.get('perioadaDeProba').setValue('5');
      } else if((+3 <= nr) && (nr < +6)) {
        this.candidatiGroup.get('perioadaDeProba').setValue('15');
      } else if(nr => +6) {
        if(this.candidatiGroup.get('functieDeConducere').value) {
          this.candidatiGroup.get('perioadaDeProba').setValue('45');
        } else {
          this.candidatiGroup.get('perioadaDeProba').setValue('30');
        }
      } 
    }
  }
  functieDeConducere() {
    if(this.candidatiGroup.get('contractDeterminat').value) {
      let contractLength = +this.candidatiGroup.get('nrLuniSaptamaniAni').value;
      // console.log('Contract length '+contractLength + 'iar butonul:'+this.candidatiGroup.get('functieDeConducere').value)
      if(contractLength>=+6) {
        if(this.candidatiGroup.get('functieDeConducere').value === true) {
          this.candidatiGroup.get('perioadaDeProba').setValue('45');
        } else {
          this.candidatiGroup.get('perioadaDeProba').setValue('30');
        }
      }
    }
  }
 
  ngOnInit(): void {
  
    this.codFirma = this.route.snapshot.paramMap.get('id');
    this.firmeService.getFirma(this.codFirma).subscribe({
      next: firma=>{
        // console.log('citire firma '+JSON.stringify(firma));
        this.numeFirma = firma.nume;
        this.sediuFirma = firma.sediu;
        this.regComertFirma = firma.regComert;
        this.nrFirma = firma.nr;
        this.cuiFirma = firma.CUI;
        this.repFirma = firma.rep;
        this.telefonFirma = firma.telefon;
      },
      error: err => {
        this.errorMessage = err;
        console.log('ceva Eroare: '+err)
      }
    });

    this.atributCandidat = CANDIDAT_ATRIBUT;
    this.salariatiService.getCoduriCor().subscribe({
      next: coduriCor => {
        this.coduriCor = coduriCor;
        this.coduriCorSelectate = coduriCor;
      },
      error: err => {
        this.errorMessage = err;
      }
    });

    this.candidatiGroup = this.fb.group({
      nrContract:     [this.nextNrContract, [Validators.required, Validators.minLength(1)]],
      dataContract:     ['', [Validators.required]],
      numeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      prenumeSalariat:  ['', [Validators.required, Validators.minLength(3)]],
      // candidatiEmail: ['', [Validators.required, Validators.email]],
      marca: ['', []],
      adresa: ['', [Validators.required, Validators.minLength(1)]],
      tara: ['Romania', [Validators.required, Validators.minLength(2)]],
      judet: ['Timis', [Validators.required, Validators.minLength(2)]],
      localitate: ['', [Validators.required, Validators.minLength(3)]],
      strada: ['', [Validators.required, Validators.minLength(3)]],
      numar: ['', [Validators.required]],
      bloc: ['-', ],
      scara: ['-', ],
      etaj: ['-', ],
      apartament: ['', ],
      actIdentitate: ['CI', [Validators.required]],
      serieCI: ['', [Validators.required]],
      numarCI: ['', [Validators.required]],
      unitateaCareAEliberatCI: ['', [Validators.required, Validators.minLength(3)]],
      dataEliberareCI: ['', [Validators.required]],
      dataExpirareCI: ['', [Validators.required]],
      cnp: ['', [Validators.required, cnpControlNumber]],
      dataAngajare: ['', [Validators.required]],
      dataAngajareNedeterminat: ['', [Validators.required]],
      nrLuniSaptamaniAni: ['', [Validators.required]],
      dataInceputCimDeterminat: ['', [Validators.required]],
      dataSfarsitCimDeterminat: ['', [Validators.required]],
      contractDeterminat: ['', []],
      artContractDeterminat: ['',[]],
      departament: ['', []],
      locDeMunca: ['', [Validators.required]],
      // functia: ['', [Validators.required]],
      codCOR: ['', [Validators.required]],
      functieDeConducere: ['',[]],
      normaIntreaga: ['true', []],
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
      // anulCurent: ['', [Validators.required]],
      nrInregCerereDeAngajare: ['', [Validators.required]],
      nrInregDeclaratieFunctieDeBaza: ['', [Validators.required]],
      nrInregDeclaratiePersoaneInIntretinere: ['', [Validators.required]],
      nrInregDeclaratieCasaDeSanatate: ['', [Validators.required]],
      nrInregDeclLuareLaCunostintaROI: ['', [Validators.required]],
      nrInregPlanificareaZilelorDeCO: ['', [Validators.required]],
      nrZileCOConveniteInAnulCurent: ['21', [Validators.required]],
      platitorDeImpozit: ['', []],
      
      functiaDeBaza: ['', []],
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
      ticheteDeMasa: ['', []],
      studiiSCED: ['', [Validators.required]]
    });
    
    this.disableNrContractSiAltele();
    
//TODO make this nicer
    this.candidatiGroup.get('nrContract').enable();
    this.candidatiGroup.get('nrContract').setValue('');
     // this.setareNrContractSiAlteNr("");

    // let addMessage = firebase.functions().httpsCallable('readMessage');
    // addMessage({})
    // .then(result=>{
    //   let nr = result["data"];
    //   console.log('Nr este '+nr)
    //   this.nextNrContract = result["data"];   
    //   this.candidatiGroup.get('nrContract').enable();
    //   this.setareNrContractSiAlteNr(nr);
      
    // }).catch((error) => {
    //   // Getting the Error details.
      
    //   var code = error.code;
    //   var message = error.message;
    //   var details = error.details;
    //   console.log('Eroare ' + error);
    // });
  }

  //TODO on key press.. any other value added for nrContract should update the rest..
  disableNrContractSiAltele() {
    this.candidatiGroup.get('nrContract').disable();
  }

// TODO on key update if one is updated, update all ?
// on submit, .. write with current NR. 
  setareNrContractSiAlteNr(nr: number) {
    this.candidatiGroup.get('nrContract').setValue(nr);
    // this.candidatiGroup.get('nrInregCerereDeAngajare').setValue(nr);
    // this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').setValue(nr);
    // this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').setValue(nr);
    // this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').setValue(nr);
    // this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').setValue(nr);
    // this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').setValue(nr);
  }

setNrInregCerereDeAngajare() {
  let val = +this.candidatiGroup.get('nrInregCerereDeAngajare').value;  
  this.candidatiGroup.get('nrInregDeclaratieFunctieDeBaza').setValue(val+1);
  this.candidatiGroup.get('nrInregDeclaratiePersoaneInIntretinere').setValue(val+2);
  this.candidatiGroup.get('nrInregDeclaratieCasaDeSanatate').setValue(val+3);
  this.candidatiGroup.get('nrInregDeclLuareLaCunostintaROI').setValue(val+4);
  this.candidatiGroup.get('nrInregPlanificareaZilelorDeCO').setValue(val+5);
}
  goBack() {
    this.router.navigate(['/candidati']);
  }

  save() {
    let asdf = new Date(this.candidatiGroup.get('dataContract').value )
    let newDate = (moment(asdf)).format("DD/MM/YYYY");
    // this.auth.userCompany
    this.isLoading=true;
    // this.candidatiGroup.disable();
    // console.log('Am trimis val '+this.candidatiGroup.get('nrContract').value)
    // let writeMessage = firebase.functions().httpsCallable('writeMessage');
    // writeMessage({count: this.candidatiGroup.get('nrContract').value})
    // .then(result=>{
      // this.candidatiGroup.enable();
      //let nr = result["data"];
      let nr = this.candidatiGroup.get('nrContract').value;
      // console.log('Nr returnat este '+nr)
      this.setareNrContractSiAlteNr(nr);
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
        dataAngajare: this.candidatiGroup.get('contractDeterminat').value? convertDateToFormat(this.candidatiGroup.get('dataAngajare').value):'-',
        dataAngajareNedeterminat:this.candidatiGroup.get('contractDeterminat').value?'-':convertDateToFormat(this.candidatiGroup.get('dataAngajareNedeterminat').value),
        nrLuniSaptamaniAni: this.candidatiGroup.get('contractDeterminat').value?this.candidatiGroup.get('nrLuniSaptamaniAni').value:'-',
        dataInceputCimDeterminat: this.candidatiGroup.get('contractDeterminat').value? convertDateToFormat(this.candidatiGroup.get('dataInceputCimDeterminat').value):'-',
        dataSfarsitCimDeterminat: this.candidatiGroup.get('contractDeterminat').value?convertDateToFormat(this.candidatiGroup.get('dataSfarsitCimDeterminat').value):'-',
        departament: this.candidatiGroup.get('departament').value,
        locDeMunca: this.candidatiGroup.get('locDeMunca').value,
        functia: this.candidatiGroup.get('codCOR').value.nume,
        codCOR: this.candidatiGroup.get('codCOR').value.cod,
        functieDeConducere: this.candidatiGroup.get('functieDeConducere').value,
        normaIntreagaDeLucruOreZi:this.candidatiGroup.get('normaIntreaga').value?this.candidatiGroup.get('normaIntreagaDeLucruOreZi').value:'-',
        normaIntreagaDeLucruOreSapt: this.candidatiGroup.get('normaIntreaga').value?this.candidatiGroup.get('normaIntreagaDeLucruOreSapt').value:'-',
        normaPartiala: this.candidatiGroup.get('normaIntreaga').value?'-':this.candidatiGroup.get('normaPartiala').value,
        repartizareProgramPtNormaPartiala:this.candidatiGroup.get('normaIntreaga').value?'-':this.candidatiGroup.get('repartizareProgramPtNormaPartiala').value,
        repartizareTimpMunca: this.candidatiGroup.get('normaIntreaga').value?'-':this.candidatiGroup.get('repartizareTimpMunca').value,
        tipIntervalRepartizare: this.candidatiGroup.get('normaIntreaga').value?'-':this.candidatiGroup.get('tipIntervalRepartizare').value,
  
        artContractDeterminat: this.candidatiGroup.get('artContractDeterminat').value,

        durataConcediuDeOdihna: this.candidatiGroup.get('durataConcediuDeOdihna').value,
        salariulDeBazaBrut: this.candidatiGroup.get('salariulDeBazaBrut').value,
        perioadaDeProba: this.candidatiGroup.get('perioadaDeProba').value,
        perioadaDePreavizInCazulConcedierii: this.candidatiGroup.get('perioadaDePreavizInCazulConcedierii').value,
        perioadaDePreavizInCazulDemisiei: this.candidatiGroup.get('perioadaDePreavizInCazulDemisiei').value,
        anulCurent:  new Date().getFullYear()+'',
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
        codFirma: this.codFirma,
        numeFirma: this.numeFirma,
        sediuFirma: this.sediuFirma,
        regComertFirma: this.regComertFirma,
        nrFirma: this.nrFirma,
        cuiFirma: this.cuiFirma,
        repFirma: this.repFirma,
        telefonFirma: this.telefonFirma,
      };
      this.salariatiService.addCandidat(data);
      // console.log('Salariat ', JSON.stringify(data));
      this.isLoading = false;
      this.router.navigate(['/candidati']);
    // }).catch((error) => {
    //   // Getting the Error details.
    //   this.candidatiGroup.enable();
    //   this.isLoading = false;
    //   var code = error.code;
    //   var message = error.message;
    //   var details = error.details;
    //   console.log('Eroare ' + error);
    // });

    
  }
  platitorDeImpozit(): string {
    if(this.candidatiGroup.get('platitorDeImpozit').value===true) {
      return "Da";
    }
    return "Nu";
  }
  functiaDeBaza(): string {
    if(this.candidatiGroup.get('functiaDeBaza').value===true) {
      return "Da";
    }
    return "Nu";
  }
  ticheteDeMasa(): string {
    if(this.candidatiGroup.get('ticheteDeMasa').value===true) {
      return "Da";
    }
    return "Nu";
  }
  dateContractDeMuncaValide(){
    if(this.isValid('dataContract') && 
       this.isValid('nrContract')){
      return true;
    } else {
      return false;
    }
  }
  dateContractDeMuncaInvalide(){
    if((this.isInvalid('dataContract') || 
        this.isInvalid('nrContract'))
    ) {
      return true;
    } else {
      return false;
    }
  }
  informatiiSalariatValid() {
    if(this.isValid('numeSalariat') && 
       this.isValid('prenumeSalariat') &&        
       this.isValid('adresa') &&
      //  this.isValid('tara') &&
      //  this.isValid('judet') &&
      //  this.isValid('localitate') &&
      //  this.isValid('strada') &&
      //  this.isValid('numar') &&
      //  this.isValid('bloc') &&
      //  this.isValid('scara') &&
      //  this.isValid('etaj') &&
      //  this.isValid('apartament') &&
       this.isValid('actIdentitate') &&
       this.isValid('serieCI') &&
       this.isValid('numarCI') &&
       this.isValid('unitateaCareAEliberatCI') &&
       this.isValid('dataEliberareCI') &&
       this.isValid('dataExpirareCI') &&
       this.isValid('cnp') 
       ){
        
       return true;
     } else {
    //  console.log('informatii salariat nu e valid  ')
       return false;
     }
  }
  informatiiSalariatInvalid() {
    if(this.isInvalid('numeSalariat') || 
        this.isInvalid('prenumeSalariat') ||        
        this.isInvalid('adresa') &&
        // this.isInvalid('tara') ||
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
    if(this.candidatiGroup.get('normaIntreaga').value) {
      if(this.isValid('normaIntreagaDeLucruOreZi') && 
       this.isValid('normaIntreagaDeLucruOreSapt') 
       ){
        return true;
      } else {
        return false;
      }
    } else {
      if(this.isValid('repartizareProgramPtNormaPartiala') && 
      this.isValid('repartizareTimpMunca') &&
      this.isValid('tipIntervalRepartizare')
      ){
        return true;
      } else {
        return false;
      }
    }    
  }

  durataMunciiInvalide() {
    if(this.candidatiGroup.get('normaIntreaga').value) {
      if(this.isInvalid('normaIntreagaDeLucruOreZi') ||  
        this.isInvalid('normaIntreagaDeLucruOreSapt') 
       ) {
         return true;
       } else {
         return false;
       }
    } else {
      if( this.isInvalid('repartizareProgramPtNormaPartiala') || 
      this.isInvalid('repartizareTimpMunca')||
      this.isInvalid('tipIntervalRepartizare')
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  durataContractValid() {
    if(this.candidatiGroup.get('contractDeterminat').value) {
      if(this.isValid('dataAngajare') && 
       this.isValid('nrLuniSaptamaniAni') &&
       this.isValid('dataInceputCimDeterminat') &&
       this.isValid('dataSfarsitCimDeterminat') 
       ){
        return true;
      } else {
        return false;
      }
    } else {
      if( this.isValid('dataAngajareNedeterminat')){
        return true;
      } else {
        return false;
      }
    }    
  }

  durataContractInvalid() {
    if(this.candidatiGroup.get('contractDeterminat').value) {
      if(this.isInvalid('dataAngajare') ||  
        this.isInvalid('nrLuniSaptamaniAni') ||
         this.isInvalid('dataInceputCimDeterminat') ||
         this.isInvalid('dataSfarsitCimDeterminat')  
       ) {
         return true;
       } else {
         return false;
       }
    } else {
      if( this.isInvalid('dataAngajareNedeterminat')) {
        return true;
      } else {
        return false;
      }
    }
  }



  loculSiFelulMunciiValid() {
    if(
       this.isValid('locDeMunca') &&
       this.isValid('codCOR')  
       ){
      return true;
    } else {
      return false;
    }
  }
  loculSiFelulMunciiInvalid() {
    if(
       this.isInvalid('locDeMunca') ||
       this.isInvalid('codCOR') 
    ) {
      return true;
    } else {
      return false;
    }
  }
  concediiSiSalariiValid() {
    if(this.isValid('durataConcediuDeOdihna') && 
       this.isValid('salariulDeBazaBrut') 
       ){
      return true;
    } else {
      return false;
    }
  }
  concediiSiSalariiInvalid() {
    if(this.isInvalid('durataConcediuDeOdihna') ||  
       this.isInvalid('salariulDeBazaBrut')
       
    ) {
      return true;
    } else {
      return false;
    }
  }
  alteClauzeValid() {
    if(this.isValid('perioadaDeProba') && 
       this.isValid('perioadaDePreavizInCazulConcedierii') &&
       this.isValid('perioadaDePreavizInCazulDemisiei') 
       ){
      return true;
    } else {
      return false;
    }
  }
  alteClauzeInvalid() {
    if(this.isInvalid('perioadaDeProba') ||  
       this.isInvalid('perioadaDePreavizInCazulConcedierii') ||
       this.isInvalid('perioadaDePreavizInCazulDemisiei')
    ) {
      return true;
    } else {
      return false;
    }
  }
  nrOrdineValid() {

    if(this.isValid('nrInregCerereDeAngajare') && 
       this.isValid('nrInregDeclaratieFunctieDeBaza') &&
       this.isValid('nrInregDeclaratiePersoaneInIntretinere') && 
       this.isValid('nrInregDeclaratieCasaDeSanatate') &&
       this.isValid('nrInregDeclLuareLaCunostintaROI') &&
       this.isValid('nrInregPlanificareaZilelorDeCO') &&
       this.isValid('nrZileCOConveniteInAnulCurent') 
       ){
      return true;
    } else {
      return false;
    }
  }
  nrOrdineInvalid() {
    if(this.isInvalid('nrInregCerereDeAngajare') ||  
       this.isInvalid('nrInregDeclaratieFunctieDeBaza') ||
       this.isInvalid('nrInregDeclaratiePersoaneInIntretinere') ||
       this.isInvalid('nrInregDeclaratieCasaDeSanatate') ||
       this.isInvalid('nrInregDeclLuareLaCunostintaROI') ||
       this.isInvalid('nrInregPlanificareaZilelorDeCO') ||
       this.isInvalid('nrZileCOConveniteInAnulCurent') 
    ) {
      return true;
    } else {
      return false;
    }
  }

  diverseValid() {

    if( 
       this.isValid('mail') &&
       this.isValid('parolaWeb') && 
       this.isValid('locatiePlata') &&
       this.isValid('iban') &&
       this.isValid('tipContract') &&
       this.isValid('sablonContractNexus') &&
       this.isValid('angajatorNexus') &&
       this.isValid('cuiAngajator') &&
       this.isValid('studiiSCED') 
       ){
      return true;
    } else {
      return false;
    }
  }
  diverseInvalid() {
    if(  
       this.isInvalid('mail') ||
       this.isInvalid('parolaWeb') ||
       this.isInvalid('locatiePlata') ||
       this.isInvalid('iban') ||
       this.isInvalid('tipContract') ||
       this.isInvalid('sablonContractNexus') ||
       this.isInvalid('angajatorNexus') ||
       this.isInvalid('cuiAngajator') ||
       this.isInvalid('studiiSCED') 
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValid(fieldName: string) {
    if(this.candidatiGroup.get(fieldName).valid && 
    (this.candidatiGroup.get(fieldName).touched || this.candidatiGroup.get(fieldName).value)) {
        return true;
    } else {

        return false;
    }
  }
  isInvalid(fieldName: string) {
    if(this.candidatiGroup.get(fieldName).touched && this.candidatiGroup.get(fieldName).invalid) {
        return true;
    } else {
        return false;
    }
  }
 
  allCategoriesAreValid() {
    if(this.dateContractDeMuncaValide() &&
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
  avemContractDeterminat() {
    console.log('contract determinat');
  }
}
function cnpControlNumber(c: AbstractControl): {[key: string]: boolean}| null {
  if(c.value!==null && (isNaN(c.value) || c.value.toString().length!==13 || (!isCnpValid(+c.value)))) {
    return {'cnpvalid': true}
  } 
  return null;
}

function isCnpValid(value: number): boolean {
  let nrControl = 279146358279;
  let sum = 0; 
  let lastDigit = value%10;
  value = Math.floor(value/10);

  while (value) {
    let toSumWith = nrControl %10;
    sum += ((value % 10) * (toSumWith));
    value = Math.floor(value / 10);
    nrControl = Math.floor(nrControl/10);
  }
  
  let _rest = sum%11;
  if((_rest===10 && lastDigit===1) || (sum%11===lastDigit)) {
    return true;
  }
  return false;
}

function convertDateToFormat(selectedDate): string {  
  let actualSelectedDate = new Date(selectedDate )
  return (moment(actualSelectedDate)).format("DD/MM/YYYY");
}
