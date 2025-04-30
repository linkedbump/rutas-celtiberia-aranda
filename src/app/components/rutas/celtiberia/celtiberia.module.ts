import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaArandaComponent } from './ruta-aranda/ruta-aranda.component';  
import { RutaIsuelaComponent } from './ruta-isuela/ruta-isuela.component';
import { CeltiberiaRoutingModule } from './celtiberia-routing.module';
import { NavigationFooterComponent } from "../../../shared/navigation-footer/navigation-footer.component";
import { RouterModule } from '@angular/router';
import { CeltiberiaComponent } from './celtiberiaComp/celtiberia.component';
import { TrekkingInfoComponent } from './trekking-info/trekking-info.component';


@NgModule({
  declarations: [
    RutaIsuelaComponent,
    RutaArandaComponent,
    CeltiberiaComponent,
    TrekkingInfoComponent
    
    
  ],
  imports: [
    CommonModule,
    CeltiberiaRoutingModule,
    NavigationFooterComponent,
    RouterModule 
]
})
export class CeltiberiaModule { }
