import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidatiListComponent } from './candidati-list/candidati-list.component';
import { CandidatiDetaliiComponent } from './candidati-detalii/candidati-detalii.component';
import { CandidatiDetailsGuard } from './candidati-details.guard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidatiAdaugareComponent } from './candidati-adaugare/candidati-adaugare.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { MatSliderModule } from '@angular/material/slider';
// import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import {MatNativeDateModule} from '@angular/material/core';
import { DemoMaterialModule } from './material-module';


import { AngularFireModule } from '@angular/fire';


const routes: Routes = [
  { path: 'candidati', component: CandidatiListComponent },
  { path: 'candidati/adauga/:id', component: CandidatiAdaugareComponent },
  { path: 'candidati/:id', component: CandidatiDetaliiComponent }
  // { path: 'candidati/:id', canActivate: [CandidatiDetailsGuard], component: CandidatiDetaliiComponent }
];

@NgModule({
  declarations: [
    CandidatiListComponent,
    CandidatiDetaliiComponent,
    CandidatiAdaugareComponent
  ],
  imports: [
    SharedModule,
    AngularFireModule,
    DemoMaterialModule,
    // MatSliderModule,
    // MatFormFieldModule,
    BrowserAnimationsModule,
    // MatNativeDateModule,


    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AngularFireModule,
    CandidatiListComponent,
    CandidatiDetaliiComponent,
    CandidatiAdaugareComponent,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [
  //   { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  // ]
})
export class CandidatiModule { }
