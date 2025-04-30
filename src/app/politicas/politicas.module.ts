import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoliticasRoutingModule } from './politicas-routing.module';
import { PoliticasComponent } from './politicas.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { TerminosComponent } from './terminos/terminos.component';
import { CookiesComponent } from './cookies/cookies.component';


@NgModule({
  declarations: [
    PoliticasComponent,
    PrivacidadComponent,


  ],
  imports: [
    CommonModule,
    PoliticasRoutingModule,
    RouterModule
    ]
})
export class PoliticasModule { }
