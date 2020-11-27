import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmeListComponent } from './firme-list/firme-list.component';
import { FirmeDetaliiComponent } from './firme-detalii/firme-detalii.component';
import { Routes, RouterModule } from '@angular/router';
import { FirmeDetailsGuard } from './firme-details.guard';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: 'firme', component: FirmeListComponent },
  { path: 'firme/:id', canActivate: [FirmeDetailsGuard], component: FirmeDetaliiComponent }
]

@NgModule({
  declarations: [
    FirmeListComponent,
    FirmeDetaliiComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ 
    FirmeListComponent,
    FirmeDetaliiComponent ]
})
export class FirmeModule { }
