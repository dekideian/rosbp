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
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { DemoMaterialModule } from './material-module';
import { AngularFireModule } from '@angular/fire';

const routes: Routes = [
  { path: 'candidati', component: CandidatiListComponent },
  { path: 'candidati/adauga', component: CandidatiAdaugareComponent },
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
    AngularFireModule,
    DemoMaterialModule,
    MatSliderModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatNativeDateModule,


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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class CandidatiModule { }
