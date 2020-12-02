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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
const routes: Routes = [
  { path: 'firme', component: FirmeListComponent },
  { path: 'firme/adauga', component: FirmeAdaugareComponent },
  // { path: 'firme/:id', canActivate: [FirmeDetailsGuard], component: FirmeDetaliiComponent }
  { path: 'firme/:id', component: FirmeDetaliiComponent }
]

@NgModule({
  declarations: [
    FirmeListComponent,
    FirmeDetaliiComponent,
    FirmeAdaugareComponent],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FirmeListComponent,
    FirmeDetaliiComponent,
    FirmeAdaugareComponent ]
})
export class FirmeModule { }
