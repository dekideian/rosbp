import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidatiListComponent } from './candidati-list/candidati-list.component';
import { CandidatiDetaliiComponent } from './candidati-detalii/candidati-detalii.component';

const routes: Routes = [
  { path: 'candidati', component: CandidatiListComponent },
  { path: 'candidati/:id', component: CandidatiDetaliiComponent }
];

@NgModule({
  declarations: [
    CandidatiListComponent,
    CandidatiDetaliiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CandidatiListComponent,
    CandidatiDetaliiComponent
  ]
})
export class CandidatiModule { }
