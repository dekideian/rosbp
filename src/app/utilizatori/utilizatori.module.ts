import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UtilizatoriDetaliiComponent } from './utilizatori-detalii/utilizatori-detalii.component';
import { UtilizatoriListComponent } from './utilizatori-list/utilizatori-list.component';
import { UtilizatoriDetailsGuard } from './utilizatori-details.guard';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../candidati/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilizatoriAdaugareComponent } from './utilizatori-adaugare/utilizatori-adaugare.component';
import { AuthUtilizatoriGuardService } from './guards/auth-utilizatori-guard.service';
const routes: Routes = [
  { path: 'utilizatori', canActivate: [AuthUtilizatoriGuardService], component: UtilizatoriListComponent },
  { path: 'utilizatori/adauga', canActivate: [AuthUtilizatoriGuardService], component: UtilizatoriAdaugareComponent },
  { path: 'utilizatori/:id', canActivate: [AuthUtilizatoriGuardService], component: UtilizatoriDetaliiComponent }
];

@NgModule({
  declarations: [
    UtilizatoriDetaliiComponent,
    UtilizatoriListComponent,
    UtilizatoriAdaugareComponent
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
    UtilizatoriDetaliiComponent,
    UtilizatoriListComponent,
    ReactiveFormsModule
  ]
})
export class UtilizatoriModule { }
