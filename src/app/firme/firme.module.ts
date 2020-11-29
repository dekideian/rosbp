import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmeListComponent } from './firme-list/firme-list.component';
import { FirmeDetaliiComponent } from './firme-detalii/firme-detalii.component';
import { Routes, RouterModule } from '@angular/router';
import { FirmeDetailsGuard } from './firme-details.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'firme', component: FirmeListComponent },
  { path: 'firme/:id', canActivate: [FirmeDetailsGuard], component: FirmeDetaliiComponent }
]

@NgModule({
  declarations: [
    FirmeListComponent,
    FirmeDetaliiComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    FirmeListComponent,
    FirmeDetaliiComponent ]
})
export class FirmeModule { }
