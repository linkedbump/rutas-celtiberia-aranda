import * as L from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  imports: [CommonModule],
  template: `
    <div id="map" class="map-container"></div>
  `,
  styles: [`
    .map-container {
      height: 500px;
      width: 100%;
    }
  `]
})
export class PoiMapComponent implements OnInit {
  pointsOfInterest: PointOfInterest[] = [
    {
      id: 1,
      title: 'Caetra',
      position: { lat: 41.5772, lng: -1.7926 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/caetra.glb',
      description: 'Escudo circular utilizado por los guerreros celtíberos.'
    },
    {
      id: 2,
      title: 'Casa Celtíbera',
      position: { lat: 41.5765, lng: -1.7918 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casa.glb',
      description: 'Reconstrucción de una vivienda típica celtíbera.'
    },
    {
      id: 3,
      title: 'Casco Tipo 1',
      position: { lat: 41.5750, lng: -1.7900 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casco1.glb',
      description: 'Casco ceremonial celtíbero del tipo Montefortino.'
    },
    {
      id: 4,
      title: 'Casco Tipo 2',
      position: { lat: 41.5740, lng: -1.7890 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/casco2.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    },   {
      id: 5,
      title: 'Druida',
      position: { lat: 41.5740, lng: -1.7800 }, // Coordenadas de ejemplo
      modelPath: 'assets/models/druida.glb',
      description: 'Casco de combate celtíbero con decoración característica.'
    }
  ];

  private map!: L.Map;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
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
      const marker = L.marker([poi.position.lat, poi.position.lng])
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