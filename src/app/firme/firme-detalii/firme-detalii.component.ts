import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { FileDetails, TemplateDetails } from 'src/app/shared/upload-file/uploadedFileDetails';
import { ContactInformation } from '../contact-information';
import { IFirma } from '../ifirma.model';
@Component({
  selector: 'app-firme-detalii',
  templateUrl: './firme-detalii.component.html',
  styleUrls: ['./firme-detalii.component.css']
})
export class FirmeDetaliiComponent implements OnInit {
  currentId: string;
  numeFirma: string;
  sediu: string;
  regComert: string;
  nr: string;
  CUI: string;
  rep: string;
  telefon: string;
  errorMessage: string;
  templates: TemplateDetails[];
  clienti: ContactInformation[];
  responsabili: ContactInformation[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private filesService: FilesService
    ) {

    }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.numeFirma = params.nume;
      this.sediu = params.sediu;
      this.regComert = params.regComert;
      this.nr = params.nr;
      this.CUI = params.CUI;
      this.rep = params.rep;
      this.telefon = params.telefon;
  });
  console.log('acu chemam');
    this.auth.callFunction();
    this.filesService.getTemplates(this.currentId).subscribe({
      next: templates => {
        this.templates = templates;
      },
      error: err => {
        this.errorMessage = err;
      }
    });

    this.filesService.getClienti(this.currentId).subscribe({
      next: clienti => {
        this.clienti = clienti;
      },
      error: err => {
        this.errorMessage = err;
      }
    });

    this.filesService.getResponsabili(this.currentId).subscribe({
      next: responsabili => {
        this.responsabili = responsabili;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  goBack() {
    this.router.navigate(['/firme']);
  }

  newFileUploaded(fileDetails: TemplateDetails) {
    fileDetails.data = new Date().toISOString().slice(0, 10);
    fileDetails.autor = this.auth.userEmail + ' ';
    fileDetails.codFirma  = this.currentId;
    // adauga firma..
    this.filesService.addTemplate(fileDetails);

    console.log('User just uploaded: ' + fileDetails.documentUrl + ' and ' + fileDetails.nume);
  }

  deleteFile(templateId: string, documentURL: string) {

    this.filesService.removeTemplate(templateId, documentURL);
  }
  deleteClient(clientUID: string) {
    this.filesService.removeClient(clientUID);
  }
  deleteResponsabil(clientUID: string) {
    this.filesService.removeResponsabil(clientUID);
  }
}
