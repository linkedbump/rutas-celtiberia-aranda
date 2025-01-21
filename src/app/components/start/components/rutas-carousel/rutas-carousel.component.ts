import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rutas-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="RutasCarruselComponent">
   <div class="rutas-header">
                    <h2>Las mejores Rutas</h2>
                    <p>La Comarca del Aranda</p>
                    </div>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" *ngFor="let image of images; let i = index" [class.active]="i === activeIndex">
          <img [src]="image.src" class="d-block w-100" [alt]="image.alt">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" (click)="prevImage()" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" (click)="nextImage()" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </section>
  `,
  styles: [`.rutas-header {
                padding-left: 50px;
                font-family: 'Raleway', sans-serif;               
              }
                           
              h2 {
                padding-left: 50px;
                font-size: 30px;
                color: #2e5c24; 
                font-weight: 800;
              }
              
              p {
                padding-left: 50px;
                color: #666;
                font-size: 14px;
                margin-bottom: 24px;
              }
              
  `]
})
export class RutasCarouselComponent {
  images = [
    { src: 'assets/images/Calcena.jpg', alt: 'Calcena' },
    { src: 'assets/images/Tierga.jpg', alt: 'Tierga' },
    { src: 'assets/images/purujosa.jpg', alt: 'Purujosa' }
  ];

  activeIndex = 0;

  nextImage() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevImage() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }
}