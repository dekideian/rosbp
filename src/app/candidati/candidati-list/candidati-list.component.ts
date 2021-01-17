import { Component, OnInit } from '@angular/core';
import { ContactInformation } from 'src/app/firme/contact-information';
import { FirmeService } from 'src/app/firme/firme.service';
import { IFirma } from 'src/app/firme/ifirma.model';
import { AuthService } from 'src/app/services/auth.service';
import { SalariatiService } from '../candidati.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.services';
import { Candidat } from 'src/app/models/Candidat.class';
import { Firma } from 'src/app/models/Firma.class';
import { Responsabil } from 'src/app/models/responsabil.class';
import { Client } from 'src/app/models/Client.class';

@Component({
  selector: 'app-candidati-list',
  templateUrl: './candidati-list.component.html',
  styleUrls: ['./candidati-list.component.css']
})
export class CandidatiListComponent implements OnInit {

  firme: IFirma[];
  candidati: Candidat[];
  candidatiFiltrate: Candidat[];
  listOfAuthorizedContacts: ContactInformation[]=[];

  candidatesMap = {}

  listFilterField = '';
  errorMessage = '';
  constructor(
    private firestoreService: FirestoreService,
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
  performFilter(filterBy: string): Candidat[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.candidati.filter((candidat: Candidat) =>
      candidat.numeSalariat.toLocaleLowerCase().indexOf(filterBy) !== -1 );      
  }

  ngOnInit(): void {
   
  console.log('Auth email '+this.auth.userEmail);
    if(this.auth.isAdmin()){ 
      console.log('we have an admin')
      this.initializeCandidatiStateAdmin();
      // this.firmeService.getFirme().subscribe({
      //   next: firme => {
      //     this.listOfAuthorizedContacts = firme.map(oFirma=>{
      //       console.log('Lasam firma: '+oFirma.nume+ ' cu uid '+oFirma.uid);
      //       console.log('suntem admin: '+this.auth.isAdmin())
      //       this.candidatiService.getCandidatiForFirmaUID(oFirma.uid).subscribe({
      //         next: listOfCandidatesForThisFirm => {
      //           console.log('bagam infirma  '+ oFirma.uid + 'candidati: '+listOfCandidatesForThisFirm.length)
      //            this.candidatesMap[oFirma.uid] = listOfCandidatesForThisFirm;
      //         }
      //       })
      //       let result = new ContactInformation();
      //       result.firmaUID = oFirma.uid;
      //       result.numeFirma = oFirma.nume;
      //       result.sediu = oFirma.sediu;
      //       result.regComert = oFirma.regComert;
      //       result.nr = oFirma.nr;
      //       result.cui = oFirma.CUI;
      //       result.rep = oFirma.rep;
      //       result.telefon = oFirma.telefon;
      //       console.log('adaugam contact info '+JSON.stringify(result));
      //       return result;
      //     });
      //   },
      //   error: err => {
      //     this.errorMessage = err;
      //   }
      // });
    }
    else if (this.auth.isRosBpEmployee()){
      console.log('we have a rosbp employee '+this.auth.userEmail)
      this.initializeCandidatiStateRosBP(this.auth.userEmail);
      // this.firmeService.getContactInfoIfResponsible(this.auth.userEmail).subscribe({
      //   next: contactInfo => {
      //     contactInfo.map(unaBucataContactInfo => {
         
      //       this.candidatiService.getCandidatiForFirmaUID(unaBucataContactInfo.firmaUID).subscribe({
      //         next: listOfCandidatesForThisFirm => {
      //           console.log('Am primit ceva se pare..'+listOfCandidatesForThisFirm.length+ ' pt firma '+unaBucataContactInfo.firmaUID);
      //            this.candidatesMap[unaBucataContactInfo.firmaUID] = listOfCandidatesForThisFirm;
      //         }
      //       })
      //     })
      //     this.listOfAuthorizedContacts = contactInfo;
      //   }
      // });
    } else if (this.auth.isAnyEmployee()) {
      console.log('we have a client '+this.auth.userEmail)
      this.initializeCandidatiStateHR(this.auth.userEmail);
      // this.firmeService.getContactInfoIfClient(this.auth.userEmail).subscribe({
      //   next: contactInfo => {
      //     contactInfo.map(unaBucataContactInfo => {
         
      //       this.candidatiService.getCandidatiForFirmaUID(unaBucataContactInfo.firmaUID).subscribe({
      //         next: listOfCandidatesForThisFirm => {
      //           console.log('Am primit ceva se pare..'+listOfCandidatesForThisFirm.length+ ' pt firma '+unaBucataContactInfo.firmaUID);
      //            this.candidatesMap[unaBucataContactInfo.firmaUID] = listOfCandidatesForThisFirm;
      //         }
      //       })
      //     })
          
      //     this.listOfAuthorizedContacts = contactInfo;
      //   }
      // });
    }
  }


  
  

  async initializeCandidatiStateAdmin() {
    // get all the firme
    const firme:Firma[] = await this.firestoreService.getAllFirmeList();
    firme.sort((a, b) => a.nume < b.nume ? -1 : (a.nume > b.nume ? 1 : 0));
    firme.map(firma=>{
      console.log('firma '+firma.nume)
      const newContactInformation = this.createContactInformationForThisFirma(firma);                        
      this.listOfAuthorizedContacts.push(newContactInformation);

      this.getCandidatiForFirmaId(firma.id); 
      return firma;
    });  
  }

  async initializeCandidatiStateRosBP(authUserEmail) {
    // get candidati pt toate firmele la care acest user e responsabil. 
    const responsabilitati: Responsabil[] = await this.firestoreService.getResponsabiliList(authUserEmail);
    responsabilitati.map(responsabil=>{
      console.log('responsabil pt'+responsabil.firmaUID);
      this.getFirmaForFirmaId(responsabil.firmaUID);
      this.getCandidatiForFirmaId(responsabil.firmaUID);
    });   
  }

  async getFirmaForFirmaId(firmaId: string){    
    const firma:Firma = await this.firestoreService.getFirmaForId(firmaId);
    const newContactInformation = this.createContactInformationForThisFirma(firma);                        
    this.listOfAuthorizedContacts.push(newContactInformation);    
  }

  async initializeCandidatiStateHR(authUserEmail) {
      // get candidati pt toate firmele la care acest user e responsabil. 
    const clienti: Client[] = await this.firestoreService.getClientiList(authUserEmail);
    clienti.map(client=>{
      console.log('client pt'+client.firmaUID);
      this.getFirmaForFirmaId(client.firmaUID);
      this.getCandidatiForFirmaId(client.firmaUID);
    });   
  }

  private createContactInformationForThisFirma(firma: Firma) {
    const newContactInformation = new ContactInformation();
    newContactInformation.firmaUID = firma.id;
    newContactInformation.numeFirma = firma.nume;
    newContactInformation.sediu = firma.sediu;
    newContactInformation.regComert = firma.regComert;
    newContactInformation.nr = firma.nr;
    newContactInformation.cui = firma.CUI;
    newContactInformation.rep = firma.rep;
    newContactInformation.telefon = firma.telefon;
    return newContactInformation;
  }

  async getCandidatiForFirmaId(firmaId: string){
    console.log('cautam candidati pt '+firmaId);
    const candidati:Candidat[] = await this.firestoreService.getCandidatiList(firmaId);
    candidati.sort((a, b) => a.nrContract < b.nrContract ? -1 : (a.nrContract > b.nrContract ? 1 : 0));
    this.candidatesMap[firmaId] = candidati;
    return candidati;
  }

  delete(idCandidat: string) {
    this.candidatiService.remove(idCandidat);
  }

  editare(idCandidat: string) {
    
   this.router.navigate([`/candidati/editare/${idCandidat}`]);
  }
}
