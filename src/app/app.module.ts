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
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBMrk9KPkfkgSnl1yG3u3hO_n358MEkVcE",
      authDomain: "ros-bp.firebaseapp.com",
      databaseURL: "https://ros-bp.firebaseio.com",
      projectId: "ros-bp",
      storageBucket: "ros-bp.appspot.com",
      messagingSenderId: "769301585939",
      appId: "1:769301585939:web:f98fd9c70f3d15b4fa9fe6",
      measurementId: "G-D9YYS9W5X2"
    }),
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
