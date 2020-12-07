import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidat, ICandidatLocal } from '../candidat';
import { SalariatiService } from '../candidati.service';
import { FilesService } from '../../services/files.service';
import { FileDetails, TemplateDetails } from 'src/app/shared/upload-file/uploadedFileDetails';
import { AuthService } from 'src/app/services/auth.service';
import { TemplateHandler } from 'easy-template-x';
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
    console.log('Current id : ' + this.currentId);
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
  async aici() {
    console.log('hah');
    const data = {
      posts: [
          {
            nrContract: 'Numar Contract',
            dataContract: 'Data Contract'
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
    let link = document.createElement("a");
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

}
