import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { NavigationFooterComponent } from '../../../../shared/navigation-footer/navigation-footer.component';
import { MapStyleService } from '../../../../services/map-style.service';

// Define un tipo para las claves de routeInfo
type RouteKey = 'ruta1' | 'ruta2' | 'ruta3' | 'ruta4' | 'ruta5';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    NavigationFooterComponent
  ]
})
export class MapComponent implements OnInit {
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private routeLines: L.Polyline[] = [];
  selectedRoute: any = null;

  // Información de las rutas
  private routeInfo: Record<RouteKey, any> = {
    ruta1: {
      name: 'Valle del Aranda',
      description: 'Ruta que recorre el valle del río Aranda, mostrando su belleza natural y paisajes característicos.',
      points: [
        { lat: 41.5740, lng: -1.7800, text: 'Inicio de la ruta', icon: 'mdi:map-marker-start' },
        { lat: 41.5745, lng: -1.7805, text: 'Mirador del Valle', icon: 'mdi:view-point' },
        { lat: 41.5750, lng: -1.7810, text: 'Final de la ruta', icon: 'mdi:map-marker-end' }
      ],
      details: [
        { text: 'Distancia: 5 km', icon: 'mdi:map-distance' },
        { text: 'Dificultad: Media', icon: 'mdi:hiking' },
        { text: 'Duración: 2 horas', icon: 'mdi:clock-outline' }
      ]
    },
    ruta2: {
      name: 'Aratis',
      description: 'Ruta histórica que sigue el antiguo camino romano de Aratis.',
      points: [
        { lat: 41.5740, lng: -1.7800, text: 'Inicio de la ruta', icon: 'mdi:map-marker-start' },
        { lat: 41.5745, lng: -1.7805, text: 'Ruinas romanas', icon: 'mdi:ruins' },
        { lat: 41.5750, lng: -1.7810, text: 'Final de la ruta', icon: 'mdi:map-marker-end' }
      ],
      details: [
        { text: 'Distancia: 4 km', icon: 'mdi:map-distance' },
        { text: 'Dificultad: Fácil', icon: 'mdi:hiking' },
        { text: 'Duración: 1.5 horas', icon: 'mdi:clock-outline' }
      ]
    },
    ruta3: {
      name: 'Oseja',
      description: 'Ruta que atraviesa el pueblo de Oseja y sus alrededores.',
      points: [
        { lat: 41.5740, lng: -1.7800, text: 'Inicio de la ruta', icon: 'mdi:map-marker-start' },
        { lat: 41.5745, lng: -1.7805, text: 'Centro de Oseja', icon: 'mdi:home-city' },
        { lat: 41.5750, lng: -1.7810, text: 'Final de la ruta', icon: 'mdi:map-marker-end' }
      ],
      details: [
        { text: 'Distancia: 3 km', icon: 'mdi:map-distance' },
        { text: 'Dificultad: Fácil', icon: 'mdi:hiking' },
        { text: 'Duración: 1 hora', icon: 'mdi:clock-outline' }
      ]
    },
    ruta4: {
      name: 'Bosque Sagrado',
      description: 'Ruta mística a través del bosque sagrado con árboles centenarios.',
      points: [
        { lat: 41.5740, lng: -1.7800, text: 'Inicio de la ruta', icon: 'mdi:map-marker-start' },
        { lat: 41.5745, lng: -1.7805, text: 'Árbol sagrado', icon: 'mdi:tree' },
        { lat: 41.5750, lng: -1.7810, text: 'Final de la ruta', icon: 'mdi:map-marker-end' }
      ],
      details: [
        { text: 'Distancia: 6 km', icon: 'mdi:map-distance' },
        { text: 'Dificultad: Media', icon: 'mdi:hiking' },
        { text: 'Duración: 2.5 horas', icon: 'mdi:clock-outline' }
      ]
    },
    ruta5: {
      name: 'Tierga',
      description: 'Ruta que conecta con el pueblo de Tierga y sus puntos de interés.',
      points: [
        { lat: 41.5740, lng: -1.7800, text: 'Inicio de la ruta', icon: 'mdi:map-marker-start' },
        { lat: 41.5745, lng: -1.7805, text: 'Mirador de Tierga', icon: 'mdi:view-point' },
        { lat: 41.5750, lng: -1.7810, text: 'Final de la ruta', icon: 'mdi:map-marker-end' }
      ],
      details: [
        { text: 'Distancia: 4.5 km', icon: 'mdi:map-distance' },
        { text: 'Dificultad: Media', icon: 'mdi:hiking' },
        { text: 'Duración: 1.5 horas', icon: 'mdi:clock-outline' }
      ]
    }
  };

  constructor(private mapStyle: MapStyleService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Inicializar el mapa
    this.map = L.map('map').setView([41.5740, -1.7800], 13);

    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Añadir marcadores y rutas
    this.addMarkersAndRoutes();
  }

  private addMarkersAndRoutes(): void {
    // Limpiar marcadores y rutas existentes
    this.clearMap();

    // Añadir marcadores y rutas para cada ruta
    Object.entries(this.routeInfo).forEach(([key, route]) => {
      // Añadir marcadores
      route.points.forEach((point: any) => {
        const marker = L.marker([point.lat, point.lng], { icon: this.mapStyle.customIcon })
          .bindPopup(`<b>${route.name}</b><br>${point.text}`)
          .addTo(this.map!);
        this.markers.push(marker);
      });

      // Añadir línea de ruta
      const routeLine = L.polyline(
        route.points.map((point: any) => [point.lat, point.lng]),
        { color: 'blue', weight: 3 }
      ).addTo(this.map!);
      this.routeLines.push(routeLine);
    });
  }

  private clearMap(): void {
    // Eliminar marcadores
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Eliminar líneas de ruta
    this.routeLines.forEach(line => line.remove());
    this.routeLines = [];
  }

  selectRoute(routeKey: RouteKey): void {
    this.selectedRoute = this.routeInfo[routeKey];
    this.clearMap();

    // Añadir solo los marcadores y la ruta seleccionada
    const route = this.routeInfo[routeKey];
    
    // Añadir marcadores
    route.points.forEach((point: any) => {
      const marker = L.marker([point.lat, point.lng])
        .bindPopup(`<b>${route.name}</b><br>${point.text}`)
        .addTo(this.map!);
      this.markers.push(marker);
    });

    // Añadir línea de ruta
    const routeLine = L.polyline(
      route.points.map((point: any) => [point.lat, point.lng]),
      { color: 'blue', weight: 3 }
    ).addTo(this.map!);
    this.routeLines.push(routeLine);

    // Centrar el mapa en la ruta seleccionada
    const bounds = L.latLngBounds(route.points.map((point: any) => [point.lat, point.lng]));
    this.map!.fitBounds(bounds);
  }
}