import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AngajatiDetaliiComponent } from './angajati-detalii/angajati-detalii.component';
import { AngajatiListComponent } from './angajati-list/angajati-list.component';
import { AngajatiDetailsGuard } from './angajati-details.guard';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../candidati/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngajatiAdaugareComponent } from './angajati-adaugare/angajati-adaugare.component';
import { AuthAngajatiGuardService } from './guards/auth-angajati-guard.service';
const routes: Routes = [
  { path: 'utilizatori', canActivate: [AuthAngajatiGuardService], component: AngajatiListComponent },
  { path: 'utilizatori/adauga', canActivate: [AuthAngajatiGuardService], component: AngajatiAdaugareComponent },
  { path: 'utilizatori/:id', canActivate: [AuthAngajatiGuardService], component: AngajatiDetaliiComponent }
  // { path: 'angajati/:id', canActivate: [AngajatiDetailsGuard], component: AngajatiDetaliiComponent }
];

@NgModule({
  declarations: [
    AngajatiDetaliiComponent,
    AngajatiListComponent,
    AngajatiAdaugareComponent
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AngajatiDetaliiComponent,
    AngajatiListComponent,
    ReactiveFormsModule
  ]
})
export class AngajatiModule { }
