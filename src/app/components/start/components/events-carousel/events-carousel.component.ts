import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-carousel.component.html',
  styleUrl: './events-carousel.component.css'
})
export class EventsCarouselComponent {
  eventItem = { 
    name: 'BELTAINE – Fiesta celtibérica de la primavera', 
    imageUrl: 'assets/events/Beltaine.png' 
  };
}