import * as L from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';
import { MapStyleService } from 'src/app/services/map-style.service';


interface PointOfInterest {
  id: number;
  title: string;
  position: { lat: number; lng: number }; // Cambiamos a lat y lng para Leaflet
  modelPath: string;
  description: string;
}

@Component({
  selector: 'app-poi-map',
  standalone: true,
  imports: [CommonModule, NavigationFooterComponent],
  template: `
    <div id="map" class="map-container"></div>
    <div class="ar-guide">
  <h3>¿Qué puedes descubrir aquí?</h3>
  <ul>
   <!-- <li>🧙‍♂️ <strong>Druida</strong> – Depositarios y guardianes del conocimiento y de la espiritualidad celta. Mediadores con lo sagrado y las divinidades.</li> -->
   <li>⚔️ <strong>Gladius hispaniensis</strong> –  Espada celtibérica de antenas.</li> 
   <!-- <li>🛡️ <strong>Casco de Lug</strong> – El símbolo máximo del honor celtíbero.</li>-->
    <li>⚔️ <strong>Casco Celtíbero</strong> – Modelo de aire calcídico que se forjaba en hierro en Aratis (c. 200 a.C.).</li>
    <li>🛡️ <strong>Caetra</strong> – Escudo pequeño circular usado por los guerreros celtibéricos.</li>
    <li>🏠 <strong>Casa Celtíbera</strong> – De planta rectangular, paredes de mampostería y barro y tejado vegetal</li>
  </ul>
  <p class="ar-hint">Toca los marcadores en el mapa para ver estos objetos en realidad aumentada.</p>
</div>


    <app-navigation-footer></app-navigation-footer>
  `,
  styles: [`
    .map-container {
      height: 500px;
      width: 80%;
    }
    .ar-guide {
  margin-top: 1rem;
  padding: 1.5rem;
  background:rgb(226, 226, 226);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.ar-guide h3 {
  margin-bottom: 1rem;
  color: #1e3c72;
  font-size: 1.2rem;
}

.ar-guide ul {
  list-style: none;
  padding: 0;
}

.ar-guide li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #333;
}

.ar-guide li strong {
  color: #2a5298;
}

.ar-hint {
  margin-top: 1rem;
  font-style: italic;
  color: #555;
  font-size: 0.95rem;
}

:host {
  display: block;
  padding-bottom: 70px; 
  padding-bottom: calc(env(safe-area-inset-bottom) + 70px);
}


@media (max-width: 768px) {
  .map-container {
    width: 100% !important;
    height: 40vh;               
  }
}

.ar-guide {
  max-height: calc(60vh);      
  overflow-y: auto;
}


  `]
})
export class PoiMapComponent implements OnInit {
  pointsOfInterest: PointOfInterest[] = [
    {
      id: 1,
      title: 'Caetra',
      position: { lat: 41.58379, lng: -1.70254 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/Caetra2.glb',
      description: 'Escudo pequeño circular usado por los guerreros celtibéricos'
    },
    {
      id: 2,
      title: 'Casa Celtíbera',
      position: { lat: 41.5765, lng: -1.7918 }, // Gotor
      modelPath: 'assets/models/casa.glb',
      description: 'De planta rectangular, paredes de mampostería y barro y tejado vegetal'
    },
    {
      id: 3,
      title: 'Casco celtíbero',
      position: { lat: 41.58400, lng: -1.78744 }, //Aratis
      modelPath: 'assets/models/casco1.glb',
      description: 'modelo de aire calcídico que se forjaba en hierro en Aratis (c. 200 a.C.)'
    },
    {
      id: 4,
      title: 'Casco celtíbero',
      position: { lat: 41.5740, lng: -1.7890 }, // Aranda
      modelPath: 'assets/models/casco2.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    },   
    {
      id: 5,
      title: 'Espada',
      position: { lat: 41.55108, lng: -1.65014 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/espadaDeAntenas.glb',
      description: 'Espada de antenas celtibera.'
    },
    
  ];

  private map!: L.Map;

  constructor(
    private router: Router,
    private mapStyle: MapStyleService
  ) {}

  ngOnInit(): void {
    this.configureLeafletDefaultIcon();
    this.initMap();
    this.addMarkers();
  }

  private configureLeafletDefaultIcon(): void {
    // Configura el icono por defecto de Leaflet
    const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/marker-icon.png';
    const shadowUrl = 'assets/leaflet/marker-shadow.png';

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  private initMap(): void {
    // Inicializa el mapa
    this.map = L.map('map').setView([41.5772, -1.7926], 13);

    // Añade la capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    // Añade marcadores para cada POI
    this.pointsOfInterest.forEach(poi => {
      const marker = L.marker([poi.position.lat, poi.position.lng], { icon: this.mapStyle.customIcon })
        .addTo(this.map)
        .bindPopup(poi.title);

      // Añade un evento de clic para navegar a la vista AR
      marker.on('click', () => this.navigateToAR(poi));
    });
  }

  navigateToAR(poi: PointOfInterest): void {
    this.router.navigate(['/ar-viewer', poi.id]);
  }
}