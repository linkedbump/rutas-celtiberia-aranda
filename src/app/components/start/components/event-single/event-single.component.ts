import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-single',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="SingleEvent">
      <div class="event-container">
        <h2>{{ eventItem.name }}</h2>
        <p class="subtitulo">Ocio, entretenimiento y tradición</p>
        <a [routerLink]="['/evento']">
        <img [src]="eventItem.imageUrl" [alt]="eventItem.name" class="event-img">
        </a>
      </div>
    </section>
  `,
  styles: [`
    .event-container {
      padding: 1.5rem;
      text-align: center;
      background: #ffffff;
      border-radius: 25px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .event-container h2 {
      font-family: 'Relaway', sans-serif;
      font-weight: 900;
      font-size: 30px;
      color: var(--primary-dark);
      margin-bottom: 0.5rem;
    }

    .subtitulo {
      font-size: 1rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .event-img {
      width: 100%;
      max-width: 500px;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class EventSingleComponent {
  eventItem = { 
    name: 'Beltaine: Fiesta celtibérica de la primavera', 
    imageUrl: 'assets/events/Beltaine.png' 
  };
}
