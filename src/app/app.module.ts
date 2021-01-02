import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ErrorComponent } from './pages/error/error.component';
import { environment } from 'src/environments/environment';

const components = [
  AppComponent,
  HomepageComponent,
  ErrorComponent
];

const angularModules = [
  BrowserModule,
  AppRoutingModule
];

const externalModules = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireDatabaseModule
]

@NgModule({
  declarations: [components],
  imports: [angularModules, externalModules],
  bootstrap: [AppComponent]
})
export class AppModule { }
