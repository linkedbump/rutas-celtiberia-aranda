import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-carousel.component.html',
  styleUrl: './events-carousel.component.css'
})
export class EventsCarouselComponent implements OnInit{
   
  eventsItems = [
    { name: 'Festival del Castillo', imageUrl: 'assets/events/FestivalCastillo.png' },
    { name: 'Mercado Medieval', imageUrl: 'assets/events/MarcadilloMedieval.png' },
    { name: 'Beltaine', imageUrl: 'assets/events/Beltaine.png' },
    { name: 'Recreación Histórica', imageUrl: 'assets/events/RecreacionesCeltibericas.png' },

    // Agrega más lugares aquí
  ];

currentSlide = 0;

ngOnInit() {
  // Iniciar el carrusel automático
  setInterval(() => {
    this.nextSlide();
  }, 100000); // cambia cada 10 segundos
}

prevSlide() {
  this.currentSlide = this.currentSlide === 0 ? 
    this.eventsItems.length - 1 : 
    this.currentSlide - 1;
}

nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.eventsItems.length; 
}

goToSlide(index: number) {
  this.currentSlide = index;
}
}



