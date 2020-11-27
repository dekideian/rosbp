import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmeListComponent } from './firme-list/firme-list.component';
import { FirmeDetaliiComponent } from './firme-detalii/firme-detalii.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'firme', component: FirmeListComponent },
  { path: 'firme/:id', component: FirmeDetaliiComponent }
]

@NgModule({
  declarations: [
    FirmeListComponent,
    FirmeDetaliiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ 
    FirmeListComponent,
    FirmeDetaliiComponent ]
})
export class FirmeModule { }
