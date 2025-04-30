import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaturaComponent } from './natura/natura.component';
import { NaturalezaRoutingModule } from './naturaleza-routing.module';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NaturalezaRoutingModule,
    NaturaComponent,
    NavigationFooterComponent
  ]
})
export class NaturalezaModule { }
