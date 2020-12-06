import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AngajatiModule } from './angajati/angajati.module';
import { FirmeModule } from './firme/firme.module';
import { CandidatiModule } from './candidati/candidati.module';
import { AuthComponent } from './shared/auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from "../environments/environment";
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'notFound', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotfoundComponent,
    AuthComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    BrowserModule,
    AngajatiModule,
    FirmeModule,
    CandidatiModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
