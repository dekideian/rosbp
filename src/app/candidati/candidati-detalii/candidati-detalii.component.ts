import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidat, ICandidatLocal } from '../candidat';
import { SalariatiService } from '../candidati.service';
import { FilesService } from '../../services/files.service';
import { FileDetails } from 'src/app/shared/upload-file/uploadedFileDetails';
import { AuthService } from 'src/app/services/auth.service';
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
  
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private candidatiService: SalariatiService,
    private filesService: FilesService) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.candidatiService.getCandidat(this.currentId).subscribe({
      next: candidat => {
        this.salariat = candidat;
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
    
    fileDetails.autor = this.auth.userEmail+" ";
    fileDetails.salariat  = this.currentId;
    this.filesService.addFile(fileDetails);
    
    console.log('User just uploaded: ' + fileDetails.documentUrl + ' and ' + fileDetails.nume);
  }
  goBack() {
    this.router.navigate(['/candidati']);
  }
  deleteFile(fileId: string, documentURL: string) {
    //comandam stergerea din tabela care ne intereseaza
    this.filesService.removeFile(fileId, documentURL);
    //  + stergerea din Storage. 
    //call service to remove file
  }
}
