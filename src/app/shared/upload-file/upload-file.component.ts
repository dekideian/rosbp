import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Candidat } from 'src/app/candidati/candidat';
import { Output, EventEmitter } from '@angular/core';
import { FileDetails } from './uploadedFileDetails';
import { UploadMetadata } from '@angular/fire/storage/interfaces';
/**
 * This component receives a path where to upload a file
 * Returns URL and documentName
*/

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @Input() filePath: string;
  @Output() uploadedFile = new EventEmitter<FileDetails>();
  selectedFile: File = null;
  downloadURL: Observable<string>;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      this.myForm.patchValue({
        fileSource: this.selectedFile,
        name: this.selectedFile.name
      });
    }
  }

  get f() {
    return this.myForm.controls;
  }

  submit() {
     const newMetadata = {
      contentDisposition: 'attachment; filename=' + this.myForm.get('name').value,
    };

     const n = Date.now();
     const filePath = `${this.filePath}/${n}`;
     const fileRef = this.storage.ref(filePath);

     const task = this.storage.upload(`${this.filePath}/${n}`, this.selectedFile, newMetadata);
     task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          fileRef.updateMetadata(newMetadata).subscribe();
          this.downloadURL.subscribe(url => {
            if (url) {
              const value = new FileDetails();
              value.nume = this.myForm.get('name').value;
              value.documentUrl = url;
              this.uploadedFile.emit(value);
              this.myForm.get('name').reset();
              this.myForm.get('file').reset();
              console.log('url:', url);
            }
          });
        })
      )
      .subscribe();
  }
}
