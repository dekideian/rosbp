import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { FileDetails, TemplateDetails } from 'src/app/shared/upload-file/uploadedFileDetails';
import { IFirma } from '../ifirma.model';
@Component({
  selector: 'app-firme-detalii',
  templateUrl: './firme-detalii.component.html',
  styleUrls: ['./firme-detalii.component.css']
})
export class FirmeDetaliiComponent implements OnInit {
  currentId: string;
  numeFirma: string;
  errorMessage: string;
  templates: TemplateDetails[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private filesService: FilesService
    ) {
      
    }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.numeFirma = params['nume'];
  });
    
    this.filesService.getTemplates(this.currentId).subscribe({
      next: templates => {
        this.templates = templates;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  goBack() {
    this.router.navigate(['/firme']);
  }

//instead of FileDetails use Template Details.. set that :D

  newFileUploaded(fileDetails: TemplateDetails) {
    fileDetails.data = new Date().toISOString().slice(0, 10);
    fileDetails.autor = this.auth.userEmail + " ";
    fileDetails.codFirma  = this.currentId;
    // adauga firma.. 
     this.filesService.addTemplate(fileDetails);
    
    console.log('User just uploaded: ' + fileDetails.documentUrl + ' and ' + fileDetails.nume);
  }

  deleteFile(templateId: string, documentURL: string) {
    //comandam stergerea din tabela care ne intereseaza
    this.filesService.removeTemplate(templateId, documentURL);
    //  + stergerea din Storage. 
    //call service to remove file
  }

}
