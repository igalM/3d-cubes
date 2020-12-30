import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquaresItemComponent } from './components/squares-item/squares-item.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ErrorComponent } from './pages/error/error.component';

const components = [
  AppComponent,
  SquaresItemComponent,
  HomepageComponent,
  ErrorComponent
];

const angularModules = [
  BrowserModule,
  AppRoutingModule
];

const services = [];

@NgModule({
  declarations: [components],
  imports: [angularModules],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
