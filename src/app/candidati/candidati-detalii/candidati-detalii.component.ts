import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidat, ICandidat } from '../candidat';
import { CandidatiService } from '../candidati.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-candidati-detalii',
  templateUrl: './candidati-detalii.component.html',
  styleUrls: ['./candidati-detalii.component.css']
})
export class CandidatiDetaliiComponent implements OnInit {
  currentId: string;
  salariat: Candidat;
  errorMessage: string;
  
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatiService: CandidatiService,
    private storage: AngularFireStorage) { }

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
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `pdfs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`pdfs/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  uploadSingle() {
    
  }

  goBack() {
    this.router.navigate(['/candidati']);
  }
}
