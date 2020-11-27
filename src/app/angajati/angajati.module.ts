import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AngajatiDetaliiComponent } from './angajati-detalii/angajati-detalii.component';
import { AngajatiListComponent } from './angajati-list/angajati-list.component';
import { AngajatiDetailsGuard } from './angajati-details.guard';

const routes: Routes = [
  { path: 'angajati', component: AngajatiListComponent },
  { path: 'angajati/:id', canActivate: [AngajatiDetailsGuard], component: AngajatiDetaliiComponent }
];

@NgModule({
  declarations: [
    AngajatiDetaliiComponent,
    AngajatiListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AngajatiDetaliiComponent,
    AngajatiListComponent
  ]
})
export class AngajatiModule { }
