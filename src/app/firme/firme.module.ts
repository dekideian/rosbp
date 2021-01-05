import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmeListComponent } from './firme-list/firme-list.component';
import { FirmeDetaliiComponent } from './firme-detalii/firme-detalii.component';
import { Routes, RouterModule } from '@angular/router';
import { FirmeDetailsGuard } from './firme-details.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirmeAdaugareComponent } from './firme-adaugare/firme-adaugare.component';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DemoMaterialModule } from '../candidati/material-module';
import { SharedModule } from '../shared/shared.module';
import { AddResponsibleComponent } from './add-responsible/add-responsible.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UploadFileComponent } from '../shared/upload-file/upload-file.component';
import { AuthFirmeGuardService } from './guards/auth-firme-guard.service';

const routes: Routes = [
  { path: 'firme', canActivate: [AuthFirmeGuardService], component: FirmeListComponent },
  { path: 'firme/adauga', canActivate: [AuthFirmeGuardService], component: FirmeAdaugareComponent },
  // { path: 'firme/:id', canActivate: [FirmeDetailsGuard], component: FirmeDetaliiComponent }
  { path: 'firme/:id', canActivate: [AuthFirmeGuardService], component: FirmeDetaliiComponent }
]

@NgModule({
  declarations: [
    FirmeListComponent,
    FirmeDetaliiComponent,
    FirmeAdaugareComponent,
    AddResponsibleComponent,
    AddClientComponent],
  imports: [
    SharedModule,
    DemoMaterialModule,
    // MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AddResponsibleComponent,
    DemoMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FirmeListComponent,
    FirmeDetaliiComponent,
    FirmeAdaugareComponent ]
})
export class FirmeModule { }
