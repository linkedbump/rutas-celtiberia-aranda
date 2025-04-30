import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaArandaComponent } from './ruta-aranda/ruta-aranda.component';
import { RutaIsuelaComponent } from './ruta-isuela/ruta-isuela.component';
import { CeltiberiaComponent } from './celtiberiaComp/celtiberia.component';

const routes: Routes = [
  { path: '', component: CeltiberiaComponent },
  { path: 'ruta-aranda', component: RutaArandaComponent },
  { path: 'ruta-isuela', component: RutaIsuelaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeltiberiaRoutingModule {}
