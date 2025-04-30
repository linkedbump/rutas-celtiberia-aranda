import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaturaComponent } from './natura/natura.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'natura',
        pathMatch: 'full'
      },
      {
        path: 'natura',
        component: NaturaComponent,
        title: 'Naturaleza Celtibérica'
      }
    ]
  }
];

@NgModule({
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
              })
              export class NaturalezaRoutingModule {}