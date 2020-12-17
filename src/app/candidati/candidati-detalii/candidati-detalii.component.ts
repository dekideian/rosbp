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
    console.log('Current id salariat: ' + this.currentId);
    this.candidatiService.getCandidat(this.currentId).subscribe({
      next: candidat => {

        this.salariat = candidat;
        console.log('Angajatul are cod firma: '+candidat?.codFirma)
        this.filesService.getTemplates(candidat?.codFirma).subscribe({
          next: files => {
            this.templateDetails = files[0];
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

    console.log('User just uploaded: ' + fileDetails.documentUrl + ' and ' + fileDetails.nume);
  }
  goBack() {
    this.router.navigate(['/candidati']);
  }
  async downloadCimGenerat() {
    console.log('hah');
    const data = {
      posts: [
          {
            prenumeNumeSalariat: this.salariat.prenumeSalariat+' '+this.salariat.numeSalariat,
            domiciliul: this.salariat.localitate + ', strada '+ this.salariat.strada+ ' nr '+this.salariat.numar+', bloc '+this.salariat.bloc+', scara '+this.salariat.scara + ', etaj '+this.salariat.etaj+', apartament '+this.salariat.apartament+', judetul '+this.salariat.judet+', '+this.salariat.tara,
            nrContract: this.salariat.nrContract,
            dataContract: this.salariat.dataContract,
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
            dataEliberareCI: this.salariat.dataEliberareCI,
            dataExpirareCI: this.salariat.dataExpirareCI,
            cnp: this.salariat.cnp,
            dataAngajare: this.salariat.dataAngajare,
            dataAngajareNedeterminat: this.salariat.dataAngajareNedeterminat,
            nrLuniSaptamaniAni: this.salariat.nrLuniSaptamaniAni,
            dataInceputCimDeterminat: this.salariat.dataInceputCimDeterminat,
            dataSfarsitCimDeterminat: this.salariat.dataSfarsitCimDeterminat,
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
          }]
      };
    const response = await fetch(this.templateDetails.documentUrl);
    const templateFile = await response.blob();
    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);
    this.saveFile('CIM_' + this.templateDetails.nume, doc);

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
      dataContract: this.salariat.dataContract,
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
      dataEliberareCI: this.salariat.dataEliberareCI,
      dataExpirareCI: this.salariat.dataExpirareCI,
      cnp: "_"+this.salariat.cnp+"",
      dataAngajare: this.salariat.dataAngajare,
      dataAngajareNedeterminat: this.salariat.dataAngajareNedeterminat,
      nrLuniSaptamaniAni: this.salariat.nrLuniSaptamaniAni,
      dataInceputCimDeterminat: this.salariat.dataInceputCimDeterminat,
      dataSfarsitCimDeterminat: this.salariat.dataSfarsitCimDeterminat,
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
