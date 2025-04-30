import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, NavigationFooterComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventosComponent {
  evento = {
    titulo: 'BELTAINE',
    subtitulo: 'Fiesta celtibérica de la primavera',
    lugar: 'Oseja (Comarca del Aranda)',
    fecha: 'Sábado 3 mayo de 2025',
    imagenUrl: 'assets/eventos/Beltaine.jpg',
    actividades: [
      { hora: '10 h', descripcion: 'Recorrido por la cañada ganadera y fuente de los Tres Caños.' },
      { hora: '11 h', descripcion: 'Rito celtíbero y bendición de términos.' },
      { hora: '11.45 h', descripcion: 'Almuerzo compartido.' },
      { hora: '13 h', descripcion: 'Plantación del mayo de Oseja, danza protectora.' },
      { hora: '14 h', descripcion: 'Comida de hermandad.' },
      { hora: '17 h', descripcion: 'Presentación de Relatos de la Celtiberia.' },
      { hora: '18.30 h', descripcion: 'Trova pastoril.' },
      { hora: '19.30 h', descripcion: 'Hoguera ritual.' },
      { hora: '20.30 h', descripcion: 'Baile celtibérico.' },
      { hora: '21.30 h', descripcion: 'Cena en torno a las brasas.' },
      { hora: '23 h', descripcion: 'Noche de estrellas y deseos.' }
    ],
    nota: 'Ocio, entretenimiento y tradición.',
    logos: [
      'assets/logos/Oseja.png',
      'assets/logos/Aranda.png',
      'assets/logos/aac.png'
    ]
  };
}

