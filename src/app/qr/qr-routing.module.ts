import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuntoCalcenaComponent } from './punto-calcena/punto-calcena.component';
import { PuntoAratisComponent } from './punto-aratis/punto-aratis.component';
import { PuntoOsejaComponent } from './punto-oseja/punto-oseja.component';

const routes: Routes = [
                { path: 'calcena', component: PuntoCalcenaComponent },
                { path: 'aratis', component: PuntoAratisComponent },
                { path: 'oseja', component: PuntoOsejaComponent }
              ];
              
@NgModule({
  imports: [RouterModule.forChild(routes)],                     
                exports: [RouterModule]
})
export class QrRoutingModule { }