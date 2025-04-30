import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { TerminosComponent } from './terminos/terminos.component';
import { CookiesComponent } from './cookies/cookies.component';

const routes: Routes = [
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'cookies', component: CookiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticasRoutingModule { }
