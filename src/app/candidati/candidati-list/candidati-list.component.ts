import { Component, OnInit } from '@angular/core';
import { ContactInformation } from 'src/app/firme/contact-information';
import { FirmeService } from 'src/app/firme/firme.service';
import { IFirma } from 'src/app/firme/ifirma.model';
import { AuthService } from 'src/app/services/auth.service';
import { ICandidatLocal } from '../candidat';
import { SalariatiService } from '../candidati.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidati-list',
  templateUrl: './candidati-list.component.html',
  styleUrls: ['./candidati-list.component.css']
})
export class CandidatiListComponent implements OnInit {

  firme: IFirma[];
  candidati: ICandidatLocal[];
  candidatiFiltrate: ICandidatLocal[];
  listOfAuthorizedContacts: ContactInformation[];

  candidatesMap = {}

  listFilterField = '';
  errorMessage = '';
  constructor(
    private router: Router,
    private candidatiService: SalariatiService,
    private firmeService: FirmeService,
    private auth: AuthService
    ) { }

  get listFilter(): string {
    return this.listFilterField;
  }
  set listFilter(value: string) {
    this.listFilterField = value;
    this.candidatiFiltrate = this.listFilter ? this.performFilter(this.listFilter) : this.candidati;
  }
  performFilter(filterBy: string): ICandidatLocal[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.candidati.filter((candidat: ICandidatLocal) =>
      candidat.numeSalariat.toLocaleLowerCase().indexOf(filterBy) !== -1 );
      //|| candidat.prenumeSalariat.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.candidatiService.getCandidati().subscribe({
      next: candidati => {
        this.candidati = candidati;
        this.candidatiFiltrate = candidati;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
    console.log('lista cand');
  

    
    if(this.auth.isAdmin()){ 
      this.firmeService.getFirme().subscribe({
        next: firme => {
          this.listOfAuthorizedContacts = firme.map(oFirma=>{
            console.log('Lasam firma: '+oFirma.nume+ ' cu uid '+oFirma.uid);
            console.log('suntem admin: '+this.auth.isAdmin())
            this.candidatiService.getCandidatiForFirmaUID(oFirma.uid).subscribe({
              next: listOfCandidatesForThisFirm => {
                console.log('bagam infirma  '+ oFirma.uid + 'candidati: '+listOfCandidatesForThisFirm.length)
                 this.candidatesMap[oFirma.uid] = listOfCandidatesForThisFirm;
              }
            })
            let result = new ContactInformation();
            result.firmaUID = oFirma.uid;
            result.numeFirma = oFirma.nume;
            result.sediu = oFirma.sediu;
            result.regComert = oFirma.regComert;
            result.nr = oFirma.nr;
            result.cui = oFirma.CUI;
            result.rep = oFirma.rep;
            result.telefon = oFirma.telefon;
            console.log('adaugam contact info '+JSON.stringify(result));
            return result;
          });
        },
        error: err => {
          this.errorMessage = err;
        }
      });
    }
    else if (this.auth.isRosBpEmployee()){
      console.log('we have a rosbp employee '+this.auth.userEmail)
      this.firmeService.getContactInfoIfResponsible(this.auth.userEmail).subscribe({
        next: contactInfo => {
          contactInfo.map(unaBucataContactInfo => {
         
            this.candidatiService.getCandidatiForFirmaUID(unaBucataContactInfo.firmaUID).subscribe({
              next: listOfCandidatesForThisFirm => {
                console.log('Am primit ceva se pare..'+listOfCandidatesForThisFirm.length+ ' pt firma '+unaBucataContactInfo.firmaUID);
                 this.candidatesMap[unaBucataContactInfo.firmaUID] = listOfCandidatesForThisFirm;
              }
            })
          })
          this.listOfAuthorizedContacts = contactInfo;
        }
      });
    } else if (this.auth.isAnyEmployee) {
      console.log('we have a client '+this.auth.userEmail)
      this.firmeService.getContactInfoIfClient(this.auth.userEmail).subscribe({
        next: contactInfo => {
          contactInfo.map(unaBucataContactInfo => {
         
            this.candidatiService.getCandidatiForFirmaUID(unaBucataContactInfo.firmaUID).subscribe({
              next: listOfCandidatesForThisFirm => {
                console.log('Am primit ceva se pare..'+listOfCandidatesForThisFirm.length+ ' pt firma '+unaBucataContactInfo.firmaUID);
                 this.candidatesMap[unaBucataContactInfo.firmaUID] = listOfCandidatesForThisFirm;
              }
            })
          })
          
          this.listOfAuthorizedContacts = contactInfo;
        }
      });

    }
  }
  delete(idCandidat: string) {
    this.candidatiService.remove(idCandidat);
  }

  editare(idCandidat: string) {
    
   this.router.navigate([`/candidati/editare/${idCandidat}`]);
  }
}
