import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidat, CandidatCSV, ICandidatLocal } from '../candidat';
import { SalariatiService } from '../candidati.service';
import { FilesService } from '../../services/files.service';
import { FileDetails, TemplateDetails } from 'src/app/shared/upload-file/uploadedFileDetails';
import { AuthService } from 'src/app/services/auth.service';
import { TemplateHandler } from 'easy-template-x';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-candidati-detalii',
  templateUrl: './candidati-detalii.component.html',
  styleUrls: ['./candidati-detalii.component.css']
})
export class CandidatiDetaliiComponent implements OnInit {
  currentId: string;
  salariat: Candidat;
  files: FileDetails[];
  errorMessage: string;
  templateDetails: TemplateDetails;
  anexeDetails: TemplateDetails;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private candidatiService: SalariatiService,
    private filesService: FilesService
    ) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');    
    this.candidatiService.getCandidat(this.currentId).subscribe({
      next: candidat => {

        this.salariat = candidat;        
        this.filesService.getTemplates(candidat?.codFirma).subscribe({
          next: files => {            
            this.templateDetails = files[0];
          },
          error: err => {
            this.errorMessage = err;
          }
        });   
        
        this.filesService.getAnexeTemplate().subscribe({
          next: files => {            
            this.anexeDetails = files[0];
          },
          error: err => {
            this.errorMessage = err;
          }
        });   
      },
      error: err => {
        this.errorMessage = err;
      }
    });
    this.filesService.getFiles(this.currentId).subscribe({
      next: files => {
        this.files = files;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }
  newFileUploaded(fileDetails: FileDetails) {
    fileDetails.data = new Date().toISOString().slice(0, 10);

    fileDetails.autor = this.auth.userEmail + ' ';
    fileDetails.salariat  = this.currentId;
    this.filesService.addFile(fileDetails);

    // console.log('User just uploaded: ' + fileDetails.documentUrl + ' and ' + fileDetails.nume);
  }
  goBack() {
    this.router.navigate(['/candidati']);
  } 
  async downloadCimGenerat() {    
    let art = '';

    // let isTrueSet = (this.salariat.artContractDeterminat == 'true');
    // if(this.salariat.artContractDeterminat) 
    // { console.log('should be visible for true!');}
    // console.log('Art contract determinat -'+this.salariat.artContractDeterminat+'- and isTrueSet '+isTrueSet);
    if(this.salariat.dataAngajareNedeterminat !== '-') {
      art = '';
    } else {
      if(this.salariat.artContractDeterminat) {
        art = 'conform Art 83 lit h) in alte cazuri prevazute expres de legi speciale ori pentru desfasurarea unor lucrari, proiecte sau programe.';
      } else {
        art = 'conform Art 83 lit b) cresterea si/sau modificarea temporara a structurii activitatii angajatorului.';  
      }
    }    
// console.log('Data inceput cim determinat '+this.salariat.dataInceputCimDeterminat + ' si '+ getDate(this.salariat.dataInceputCimDeterminat));
    const data = {
      posts: [
          {
            articolContractDeterminat: art,            
            prenumeNumeSalariat: this.salariat.prenumeSalariat+' '+this.salariat.numeSalariat,
            domiciliul: this.salariat.adresa,
            nrContract: this.salariat.nrContract,
            dataContract: getDate(this.salariat.dataContract),
            numeSalariat: this.salariat.numeSalariat,
            prenumeSalariat: this.salariat.prenumeSalariat,
            marca: this.salariat.marca,
            tara: this.salariat.tara,
            judet: this.salariat.judet,
            localitate: this.salariat.localitate,
            strada: this.salariat.strada,
            numar: this.salariat.numeSalariat,
            bloc: this.salariat.bloc,
            scara: this.salariat.scara,
            etaj: this.salariat.etaj,
            apartament: this.salariat.apartament,
            actIdentitate: this.salariat.actIdentitate,
            serieCI: this.salariat.serieCI,
            numarCI: this.salariat.numarCI,
            unitateaCareAEliberatCI: this.salariat.unitateaCareAEliberatCI,
            dataEliberareCI: getDate(this.salariat.dataEliberareCI),
            dataExpirareCI: getDate(this.salariat.dataExpirareCI),
            cnp: this.salariat.cnp,
            dataAngajare: getDate(this.salariat.dataAngajare),
            dataAngajareNedeterminat: getDate(this.salariat.dataAngajareNedeterminat),
            nrLuniSaptamaniAni: this.salariat.nrLuniSaptamaniAni,
            dataInceputCimDeterminat: getDate(this.salariat.dataInceputCimDeterminat),
            dataSfarsitCimDeterminat: getDate(this.salariat.dataSfarsitCimDeterminat),
            departament: this.salariat.departament,
            locDeMunca: this.salariat.locDeMunca,
            functia: this.salariat.functia,
            codCOR: this.salariat.codCOR,
            normaIntreagaDeLucruOreZi: this.salariat.normaIntreagaDeLucruOreZi,
            normaIntreagaDeLucruOreSapt: this.salariat.normaIntreagaDeLucruOreSapt,
            normaPartiala: this.salariat.normaPartiala,
            repartizareProgramPtNormaPartiala: this.salariat.repartizareProgramPtNormaPartiala,
            repartizareTimpMunca: this.salariat.repartizareTimpMunca,
            tipIntervalRepartizare: this.salariat.tipIntervalRepartizare,
            durataConcediuDeOdihna: this.salariat.durataConcediuDeOdihna,
            salariulDeBazaBrut: this.salariat.salariulDeBazaBrut,
            perioadaDeProba: this.salariat.perioadaDeProba,
            perioadaDePreavizInCazulConcedierii: this.salariat.perioadaDePreavizInCazulConcedierii,
            perioadaDePreavizInCazulDemisiei: this.salariat.perioadaDePreavizInCazulDemisiei,
            anulCurent: this.salariat.anulCurent,
            nrInregCerereDeAngajare: this.salariat.nrInregCerereDeAngajare,
            nrInregDeclaratieFunctieDeBaza: this.salariat.nrInregDeclaratieFunctieDeBaza,
            nrInregDeclaratiePersoaneInIntretinere: this.salariat.nrInregDeclaratiePersoaneInIntretinere,
            nrInregDeclaratieCasaDeSanatate: this.salariat.nrInregDeclaratieCasaDeSanatate,
            nrInregDeclLuareLaCunostintaROI: this.salariat.nrInregDeclLuareLaCunostintaROI,
            nrInregPlanificareaZilelorDeCO: this.salariat.nrInregPlanificareaZilelorDeCO,
            nrZileCOConveniteInAnulCurent: this.salariat.nrZileCOConveniteInAnulCurent,
            platitorDeImpozit: this.salariat.platitorDeImpozit,
            functiaDeBaza: this.salariat.functiaDeBaza,
            mail: this.salariat.mail,
            parolaWeb: this.salariat.parolaWeb,
            locatiePlata: this.salariat.locatiePlata,
            bancaAngajator: this.salariat.bancaAngajator,
            iban: this.salariat.iban,
            tipContract: this.salariat.tipContract,
            sablonContractNexus: this.salariat.sablonContractNexus,
            angajatorNexus: this.salariat.angajatorNexus,
            cuiAngajator: this.salariat.cuiAngajator,
            cuiLocDeMunca: this.salariat.cuiLocDeMunca,
            ticheteDeMasa: this.salariat.ticheteDeMasa,
            studiiSCED: this.salariat.studiiSCED,

            numeFirma: this.salariat.numeFirma,
            sediuFirma: this.salariat.sediuFirma,
            regComertFirma: this.salariat.regComertFirma,
            nrFirma: this.salariat.nrFirma,
            cuiFirma: this.salariat.cuiFirma,
            repFirma: this.salariat.repFirma,
            telefonFirma: this.salariat.telefonFirma
          }]
      };
    const response = await fetch(this.templateDetails.documentUrl);
    const templateFile = await response.blob();
    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);
    this.saveFile('CIM_' +this.salariat.prenumeSalariat+"_"+this.salariat.numeSalariat+"_"+ this.templateDetails.nume, doc);

  }
  
  

  async downloadAnexeGenerate() {
    // console.log('download anexe');

    let tc = '';
    let restPerioada = '';
    let anexaTipContract='';
    let anexaOreZi=''; //oz
    if( this.salariat.normaIntreagaDeLucruOreZi !== '-' ) {
      //norma intreaga
      anexaOreZi = this.salariat.normaIntreagaDeLucruOreZi;  
    } else {
      //norma partiala
      anexaOreZi = this.salariat.normaPartiala;
    }

    if(this.salariat.dataAngajareNedeterminat!=='-'){
      // console.log('avem nedeterminat');
      tc = 'Nedeterminata'
      anexaTipContract = 'Nedeterminata'
      restPerioada = this.salariat.dataAngajareNedeterminat;
    } else {
      let dic = new Date(this.salariat.dataInceputCimDeterminat);
      let dfc = new Date(this.salariat.dataSfarsitCimDeterminat);
      // console.log('avem determinat');
      // console.log('Data inceput contract '+this.salariat.dataInceputCimDeterminat);
      // console.log('Data sf contract '+this.salariat.dataSfarsitCimDeterminat);
      // console.log('Durata muncii '+(dfc.getDate()-dic.getDate()));
      let months = getMonthsBetween(dic,dfc, true);
      // console.log('Durata muncii2 '+months);
      tc = 'Determinata'
      anexaTipContract = 'Determinata '+months+ ' luni'
      restPerioada = this.salariat.dataInceputCimDeterminat+' ('+months+' luni, pana la data de '+this.salariat.dataSfarsitCimDeterminat+')';
    }       

    const data = {
      posts: [
          {
            tc: tc,
            az: anexaOreZi,
            rp: restPerioada,
            prenumeNumeSalariat: this.salariat.prenumeSalariat+' '+this.salariat.numeSalariat,
            domiciliul: this.salariat.localitate + ', strada '+ this.salariat.strada+ ' nr '+this.salariat.numar+', bloc '+this.salariat.bloc+', scara '+this.salariat.scara + ', etaj '+this.salariat.etaj+', apartament '+this.salariat.apartament+', judetul '+this.salariat.judet+', '+this.salariat.tara,
            nrContract: this.salariat.nrContract,
            dataContract: getDate(this.salariat.dataContract),
            numeSalariat: this.salariat.numeSalariat,
            prenumeSalariat: this.salariat.prenumeSalariat,
            marca: this.salariat.marca,
            tara: this.salariat.tara,
            judet: this.salariat.judet,
            localitate: this.salariat.localitate,
            strada: this.salariat.strada,
            numar: this.salariat.numeSalariat,
            bloc: this.salariat.bloc,
            scara: this.salariat.scara,
            etaj: this.salariat.etaj,
            apartament: this.salariat.apartament,
            actIdentitate: this.salariat.actIdentitate,
            serieCI: this.salariat.serieCI,
            numarCI: this.salariat.numarCI,
            unitateaCareAEliberatCI: this.salariat.unitateaCareAEliberatCI,
            dataEliberareCI: getDate(this.salariat.dataEliberareCI),
            dataExpirareCI: getDate(this.salariat.dataExpirareCI),
            cnp: this.salariat.cnp,
            dataAngajare: this.salariat.dataAngajare=="-"?getDate(this.salariat.dataAngajareNedeterminat):getDate(this.salariat.dataAngajare),
            dataAngajareNedeterminat: getDate(this.salariat.dataAngajareNedeterminat),
            nrLuniSaptamaniAni: this.salariat.nrLuniSaptamaniAni,
            dataInceputCimDeterminat: getDate(this.salariat.dataInceputCimDeterminat),
            dataSfarsitCimDeterminat: getDate(this.salariat.dataSfarsitCimDeterminat),
            dac: getDate(this.salariat.dataInceputCimDeterminat),
            dsc: getDate(this.salariat.dataSfarsitCimDeterminat),
            departament: this.salariat.departament,
            locDeMunca: this.salariat.locDeMunca,
            functia: this.salariat.functia,
            codCOR: this.salariat.codCOR,
            normaIntreagaDeLucruOreZi: this.salariat.normaIntreagaDeLucruOreZi,
            normaIntreagaDeLucruOreSapt: this.salariat.normaIntreagaDeLucruOreSapt,
            normaPartiala: this.salariat.normaPartiala,
            repartizareProgramPtNormaPartiala: this.salariat.repartizareProgramPtNormaPartiala,
            repartizareTimpMunca: this.salariat.repartizareTimpMunca,
            tipIntervalRepartizare: this.salariat.tipIntervalRepartizare,
            durataConcediuDeOdihna: this.salariat.durataConcediuDeOdihna,
            salariulDeBazaBrut: this.salariat.salariulDeBazaBrut,
            perioadaDeProba: this.salariat.perioadaDeProba,
            perioadaDePreavizInCazulConcedierii: this.salariat.perioadaDePreavizInCazulConcedierii,
            perioadaDePreavizInCazulDemisiei: this.salariat.perioadaDePreavizInCazulDemisiei,
            anulCurent: this.salariat.anulCurent,
            nrInregCerereDeAngajare: this.salariat.nrInregCerereDeAngajare,
            nrInregDeclaratieFunctieDeBaza: this.salariat.nrInregDeclaratieFunctieDeBaza,
            nrInregDeclaratiePersoaneInIntretinere: this.salariat.nrInregDeclaratiePersoaneInIntretinere,
            nrInregDeclaratieCasaDeSanatate: this.salariat.nrInregDeclaratieCasaDeSanatate,
            nrInregDeclLuareLaCunostintaROI: this.salariat.nrInregDeclLuareLaCunostintaROI,
            nrInregPlanificareaZilelorDeCO: this.salariat.nrInregPlanificareaZilelorDeCO,
            nrZileCOConveniteInAnulCurent: this.salariat.nrZileCOConveniteInAnulCurent,
            platitorDeImpozit: this.salariat.platitorDeImpozit,
            functiaDeBaza: this.salariat.functiaDeBaza,
            mail: this.salariat.mail,
            parolaWeb: this.salariat.parolaWeb,
            locatiePlata: this.salariat.locatiePlata,
            bancaAngajator: this.salariat.bancaAngajator,
            iban: this.salariat.iban,
            tipContract: anexaTipContract,
            sablonContractNexus: this.salariat.sablonContractNexus,
            angajatorNexus: this.salariat.angajatorNexus,
            cuiAngajator: this.salariat.cuiAngajator,
            cuiLocDeMunca: this.salariat.cuiLocDeMunca,
            ticheteDeMasa: this.salariat.ticheteDeMasa,
            studiiSCED: this.salariat.studiiSCED,
            numeFirma: this.salariat.numeFirma,
            sediuFirma: this.salariat.sediuFirma,
            regComertFirma: this.salariat.regComertFirma,
            nrFirma: this.salariat.nrFirma,
            cuiFirma: this.salariat.cuiFirma,
            repFirma: this.salariat.repFirma,
            telefonFirma: this.salariat.telefonFirma
          }]
      };      
    const response = await fetch(this.anexeDetails.documentUrl);    
    const templateFile = await response.blob();    
    const handler = new TemplateHandler();    
    const doc = await handler.process(templateFile, data);    
    this.saveFile('_' +this.salariat.prenumeSalariat+"_"+this.salariat.numeSalariat+"_anexa.docx", doc);

  }
  

  deleteFile(fileId: string, documentURL: string) {
    this.filesService.removeFile(fileId, documentURL);
  }

  saveFile(filename, blob) {

    // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement('a');
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}

  csvExport() {

    const data: CandidatCSV[] = [{
      nrContract: this.salariat.nrContract,
      dataContract: getDate(this.salariat.dataContract),
      numeSalariat: this.salariat.numeSalariat,
      prenumeSalariat: this.salariat.prenumeSalariat,
      marca: this.salariat.marca,
      tara: this.salariat.tara,
      judet: this.salariat.judet,
      localitate: this.salariat.localitate,
      strada: this.salariat.strada,
      numar: this.salariat.numeSalariat,
      bloc: this.salariat.bloc,
      scara: this.salariat.scara,
      etaj: this.salariat.etaj,
      apartament: this.salariat.apartament,
      actIdentitate: this.salariat.actIdentitate,
      serieCI: this.salariat.serieCI,
      numarCI: this.salariat.numarCI,
      unitateaCareAEliberatCI: this.salariat.unitateaCareAEliberatCI,
      dataEliberareCI: getDate(this.salariat.dataEliberareCI),
      dataExpirareCI: getDate(this.salariat.dataExpirareCI),
      cnp: "_"+this.salariat.cnp+"",
      dataAngajare: getDate(this.salariat.dataAngajare),
      dataAngajareNedeterminat: getDate(this.salariat.dataAngajareNedeterminat),
      nrLuniSaptamaniAni: this.salariat.nrLuniSaptamaniAni,
      dataInceputCimDeterminat: getDate(this.salariat.dataInceputCimDeterminat),
      dataSfarsitCimDeterminat: getDate(this.salariat.dataSfarsitCimDeterminat),
      departament: this.salariat.departament,
      locDeMunca: this.salariat.locDeMunca,
      functia: this.salariat.functia,
      codCOR: this.salariat.codCOR,
      normaIntreagaDeLucruOreZi: this.salariat.normaIntreagaDeLucruOreZi,
      normaIntreagaDeLucruOreSapt: this.salariat.normaIntreagaDeLucruOreSapt,
      normaPartiala: this.salariat.normaPartiala,
      repartizareProgramPtNormaPartiala: this.salariat.repartizareProgramPtNormaPartiala,
      repartizareTimpMunca: this.salariat.repartizareTimpMunca,
      tipIntervalRepartizare: this.salariat.tipIntervalRepartizare,
      durataConcediuDeOdihna: this.salariat.durataConcediuDeOdihna,
      salariulDeBazaBrut: this.salariat.salariulDeBazaBrut,
      perioadaDeProba: this.salariat.perioadaDeProba,
      perioadaDePreavizInCazulConcedierii: this.salariat.perioadaDePreavizInCazulConcedierii,
      perioadaDePreavizInCazulDemisiei: this.salariat.perioadaDePreavizInCazulDemisiei,
      anulCurent: this.salariat.anulCurent,
      nrInregCerereDeAngajare: this.salariat.nrInregCerereDeAngajare,
      nrInregDeclaratieFunctieDeBaza: this.salariat.nrInregDeclaratieFunctieDeBaza,
      nrInregDeclaratiePersoaneInIntretinere: this.salariat.nrInregDeclaratiePersoaneInIntretinere,
      nrInregDeclaratieCasaDeSanatate: this.salariat.nrInregDeclaratieCasaDeSanatate,
      nrInregDeclLuareLaCunostintaROI: this.salariat.nrInregDeclLuareLaCunostintaROI,
      nrInregPlanificareaZilelorDeCO: this.salariat.nrInregPlanificareaZilelorDeCO,
      nrZileCOConveniteInAnulCurent: this.salariat.nrZileCOConveniteInAnulCurent,
      platitorDeImpozit: this.salariat.platitorDeImpozit,
      functiaDeBaza: this.salariat.functiaDeBaza,
      mail: this.salariat.mail,
      parolaWeb: this.salariat.parolaWeb,
      locatiePlata: this.salariat.locatiePlata,
      bancaAngajator: this.salariat.bancaAngajator,
      iban: this.salariat.iban,
      tipContract: this.salariat.tipContract,
      sablonContractNexus: this.salariat.sablonContractNexus,
      angajatorNexus: this.salariat.angajatorNexus,
      cuiAngajator: this.salariat.cuiAngajator,
      cuiLocDeMunca: this.salariat.cuiLocDeMunca,
      ticheteDeMasa: this.salariat.ticheteDeMasa,
      studiiSCED: this.salariat.studiiSCED
    }];
    //  const data = data2.items;

    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => {
         return header.map(fieldName => {
            return fieldName + ';' + JSON.stringify(row[fieldName], replacer);
          }).join('\r\n');
      }
      );

    const tableHeaders = ['Denumire camp', 'Valoare'];
    csv.unshift(tableHeaders.join(';'));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    this.saveFile('myFile.csv', blob);
  }

}

function getMonthsBetween(date1,date2,roundUpFractionalMonths)
{
    //Months will be calculated between start and end dates.
    //Make sure start date is less than end date.
    //But remember if the difference should be negative.
    var startDate=date1;
    var endDate=date2;
    var inverse=false;
    if(date1>date2)
    {
        startDate=date2;
        endDate=date1;
        inverse=true;
    }

    //Calculate the differences between the start and end dates
    var yearsDifference=endDate.getFullYear()-startDate.getFullYear();
    var monthsDifference=endDate.getMonth()-startDate.getMonth();
    var daysDifference=endDate.getDate()-startDate.getDate();

    var monthCorrection=0;
    //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
    //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
    if(roundUpFractionalMonths===true && daysDifference>0)
    {
        monthCorrection=1;
    }
    //If the day difference between the 2 months is negative, the last month is not a whole month.
    else if(roundUpFractionalMonths!==true && daysDifference<0)
    {
        monthCorrection=-1;
    }

    return (inverse?-1:1)*(yearsDifference*12+monthsDifference+monthCorrection);
};

function getDate(dateAsString) {
  return dateAsString;
  // console.log('Date '+dateAsString);
  // if(dateAsString && !isNaN(new Date(dateAsString).getTime())) {
  //   let today = new Date(dateAsString);     
  //   var dd = String(today.getDate()).padStart(2, '0');    
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();
    
  //   return mm + '/' + dd + '/' + yyyy;
  // } else {
  //   return '-';
  // }
}

