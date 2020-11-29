import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidatiListComponent } from './candidati-list/candidati-list.component';
import { CandidatiDetaliiComponent } from './candidati-detalii/candidati-detalii.component';
import { CandidatiDetailsGuard } from './candidati-details.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'candidati', component: CandidatiListComponent },
  { path: 'candidati/:id', canActivate: [CandidatiDetailsGuard], component: CandidatiDetaliiComponent }
];

@NgModule({
  declarations: [
    CandidatiListComponent,
    CandidatiDetaliiComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CandidatiListComponent,
    CandidatiDetaliiComponent
  ]
})
export class CandidatiModule { }
