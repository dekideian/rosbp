import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AngajatiModule } from './angajati/angajati.module';
import { FirmeModule } from './firme/firme.module';
import { CandidatiModule } from './candidati/candidati.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'notFound', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotfoundComponent
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AngajatiModule,
    FirmeModule,
    CandidatiModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
