import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // Declaramos bootstrap

@Component({
  selector: 'app-places-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places-carousel.component.html',
  styleUrls: ['./places-carousel.component.css']
})
export class PlacesCarouselComponent implements OnInit {
  placesItems = [
    { label: 'Aranda del Moncayo', imageUrl: 'assets/images/ArandaDeMoncayo.jpg',description: ' '},
    { label: 'Gotor', imageUrl: 'assets/images/Gotor.jpg', description: ' '},
    { label: 'Calcena', imageUrl: 'assets/images/Calcena.jpg', description: ' ' },
    { label: 'Purujosa', imageUrl: 'assets/images/purujosa.jpg', description: ' ' },
    { label: 'Illueca', imageUrl: 'assets/images/Oseja.jpg', description: ' '},
  ];

  currentSlide = 0;

  ngOnInit() {
    this.placesItems = this.removeDuplicates(this.placesItems);
    // Iniciar el carrusel automático
    setInterval(() => {
      this.nextSlide();
    }, 100000); // cambia cada 10 segundos
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? 
      this.placesItems.length - 1 : 
      this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.placesItems.length - 1 ? 
      0 : 
      this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  removeDuplicates(items: any[]): any[] {
    return items.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.label === item.label // Asegúrate de que el criterio de duplicado sea correcto
        ))
    );
  }
}
