import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private routes: { [key: string]: L.LayerGroup } = {}; // Almacena las rutas disponibles

  // Solución para cargar iconos en Angular
  private defaultIcon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png', // Path a los iconos en Angular
    iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  ngOnInit(): void {
    this.setDefaultIcon();
    this.initMap();
    this.defineRoutes();
  }

  private setDefaultIcon(): void {
    L.Marker.prototype.options.icon = this.defaultIcon;
  }

  private initMap(): void {
    this.map = L.map('map').setView([41.6691, -1.7001], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize(); // Ajusta el tamaño del mapa dinámicamente
    }, 0);
  }

  private defineRoutes(): void {
    // Ruta: Valle del Aranda
    const valleAranda = L.layerGroup([
      L.polyline([
        [41.6691, -1.7001],
        [41.6679, -1.6980],
        [41.6323, -1.7600],
        [41.6310, -1.7590]
      ], { color: 'blue', weight: 4, opacity: 0.7 }),
      L.marker([41.6691, -1.7001]).bindPopup('Gotor: Convento Dominico'),
      L.marker([41.6679, -1.6980]).bindPopup('Yacimiento del Calvario'),
      L.marker([41.6323, -1.7600]).bindPopup('Mirador de Aranda de Moncayo'),
      L.marker([41.6310, -1.7590]).bindPopup('Centro de Interpretación')
    ]);

    // Ruta: Aratis
    const aratis = L.layerGroup([
      L.polyline([
        [41.6323, -1.7600],
        [41.6310, -1.7590],
        [41.6275, -1.7680]
      ], { color: 'green', weight: 4, opacity: 0.7 }),
      L.marker([41.6275, -1.7680]).bindPopup('Yacimiento de Aratis: Muralla y Necrópolis')
    ]);

    // Ruta: Bosque Sagrado
    const bosqueSagrado = L.layerGroup([
      L.polyline([
        [41.6960, -1.8160],
        [41.7000, -1.8300]
      ], { color: 'purple', weight: 4, opacity: 0.7 }),
      L.marker([41.6960, -1.8160]).bindPopup('Purujosa: Punto de inicio'),
      L.marker([41.7000, -1.8300]).bindPopup('Bosque Sagrado de la Celtiberia')
    ]);

    // Ruta: Oseja
    const oseja = L.layerGroup([
      L.polyline([
        [41.6940, -1.8120],
        [41.7000, -1.8180]
      ], { color: 'orange', weight: 4, opacity: 0.7 }),
      L.marker([41.6940, -1.8120]).bindPopup('Oseja: Inicio de la ruta'),
      L.marker([41.7000, -1.8180]).bindPopup('Cerro del yacimiento celtíbero')
    ]);

    // Añadir rutas al objeto
    this.routes = { valleAranda, aratis, bosqueSagrado, oseja };
  }

  loadRoute(routeName: string): void {
    // Limpia las capas actuales del mapa
    this.clearMap();

    // Carga la ruta seleccionada
    const route = this.routes[routeName];
    if (route) {
      route.addTo(this.map);
    }
  }

  private clearMap(): void {
    Object.values(this.routes).forEach(route => this.map.removeLayer(route));
  }
}
