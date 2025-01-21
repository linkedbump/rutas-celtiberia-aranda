import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsCarouselComponent } from "./components/events-carousel/events-carousel.component";
import { PlacesCarouselComponent } from "./components/places-carousel/places-carousel.component";
import { MenuCarouselComponent } from './components/menu-carousel/menu-carousel.component';
import { RutasCarouselComponent } from './components/rutas-carousel/rutas-carousel.component';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EventsCarouselComponent,
    PlacesCarouselComponent,
    MenuCarouselComponent,
    RutasCarouselComponent,
    NavigationFooterComponent
   
  
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

}