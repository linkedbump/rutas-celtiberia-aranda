import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

// Define un tipo para las claves de routeInfo
type RouteKey = 'valleAranda' | 'aratis' | 'bosqueSagrado' | 'oseja' | 'tierga';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  region: string = ''; // Región seleccionada
  selectedRoute: any = null; // Almacena la información de la ruta seleccionada

  private map!: L.Map;
  private routes: { [key: string]: L.LayerGroup } = {}; // Almacena las rutas disponibles

  // Icono por defecto
  private defaultIcon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png', // Path a los iconos en Angular
    iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Información de las rutas
  routeInfo = {
    valleAranda: {
      title: 'El valle de Aranda: Tras las huellas de los Celtíberos',
      description: 'Una ruta que comienza en Gotor, pasando por el yacimiento del Calvario y terminando en el Centro de Interpretación de Aranda de Moncayo. Ideal para quienes buscan conectar con la historia de los celtíberos y disfrutar de un entorno natural.',
      points: [
        { icon: 'mdi-light:map-marker', text: 'Convento Dominico de la Consolación' },
        { icon: 'mdi:information', text: 'Yacimiento del Calvario (a 1 km de Gotor, pequeño poblado celtíbero)' },
        { icon: 'mdi:eye', text: 'Mirador de Aranda de Moncayo (vista del embalse de Maidevera y el cerro de Aratis)' }
      ],
      details: [
        { icon: 'mdi:road', text: 'Longitud: 7 km' },
        { icon: 'mdi:clock', text: 'Duración: 2.5 horas' },
        { icon: 'mdi:check-circle', text: 'Dificultad: Fácil (apto para familias)' },
        { icon: 'mdi:foot-print', text: 'Terreno: Senderos rurales y caminos asfaltados' },
        { icon: 'mdi:water', text: 'Recomendaciones: Llevar agua y calzado cómodo' }
      ]
    },
    aratis: {
      title: 'Aratis: La ciudad de hierro y fuego',
      description: 'Descripción de la ruta Aratis...',
      points: [
        // Puntos de interés para Aratis
      ],
      details: [
        // Detalles de la ruta Aratis
      ]
    },
    bosqueSagrado: {
      title: 'Bosque Sagrado: El bosque sagrado de los Celtíberos',
      description: 'Descripción de la ruta Bosque Sagrado...',
      points: [
        // Puntos de interés para Bosque Sagrado
      ],
      details: [
        // Detalles de la ruta Bosque Sagrado
      ]
    },
    oseja: {
      title: 'Oseja: Paisajes celtas y tradición',
      description: 'Descripción de la ruta Oseja...',
      points: [
        // Puntos de interés para Oseja
      ],
      details: [
        // Detalles de la ruta Oseja
      ]
    },
    tierga: {
      title: 'Tierga: y el legado Celtíberico',
      description: 'Descripción de la ruta de tierga...',
      points: [
        // Puntos de interés para Oseja
      ],
      details: [
        // Detalles de la ruta Oseja
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener región desde la URL
    this.region = this.route.snapshot.paramMap.get('region') || '';
    this.loadRoutesByRegion(this.region);

    this.setDefaultIcon();
    this.initMap();
    this.defineRoutes();
  }

  // Método para cargar rutas según región
  loadRoutesByRegion(region: string): void {
    switch (region) {
      case 'aranda':
        this.loadRoute('valleAranda'); // Cargar ruta Valle Aranda
        console.log('Cargando rutas del Valle de Aranda');
        break;
      case 'isuela':
        this.loadRoute('aratis'); // Cargar ruta Aratis
        console.log('Cargando rutas del Valle de Isuela');
        break;
      case 'Tierga':
        this.loadRoute('tierga'); // Cargar ruta tierga
        console.log('Cargando rutas de tierga');
        break;
      case 'oseja':
        this.loadRoute('oseja'); // Cargar ruta Oseja
        console.log('Cargando rutas de Oseja');
        break;
      default:
        console.error('Región no válida');
        break;
    }
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
      ], { color: 'red', weight: 4, opacity: 0.7 }),
      L.marker([41.6691, -1.7001]).bindPopup('Gotor: Convento Dominico'),
      L.marker([41.6679, -1.6980]).bindPopup('Yacimiento del Calvario'),
      L.marker([41.6323, -1.7600]).bindPopup('Mirador de Aranda de Moncayo'),
      L.marker([41.6310, -1.7590]).bindPopup('Centro de Interpretación')
    ]);

    // Ruta: Aratis
    const aratis = L.layerGroup([
      L.polyline([
        [41.5782, -1.7921], // Mirador de Aranda de Moncayo
        [41.5831, -1.7850], // Yacimiento de Aratis
        [41.5840, -1.7800]  // Peñas Paseras
      ], { color: 'yellow', weight: 4, opacity: 0.7 }),
  
      // Marcadores con descripciones
      L.marker([41.5782, -1.7921]).bindPopup('Inicio: Mirador de Aranda de Moncayo'),
      L.marker([41.5831, -1.7850]).bindPopup('Yacimiento de Aratis: Muralla, torres defensivas y necrópolis'),
      L.marker([41.5840, -1.7800]).bindPopup('Peñas Paseras: Necrópolis con santuario y muro astrológico')
        ]);

    // Ruta: Bosque Sagrado
    const bosqueSagrado = L.layerGroup([
      L.polyline([
        [41.6960, -1.8160],
        [41.7000, -1.8300]
      ], { color: 'yellow', weight: 4, opacity: 0.7 }),
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

  loadRoute(routeName: RouteKey): void {
    // Limpia las capas actuales del mapa
    this.clearMap();

    // Carga la ruta seleccionada
    const route = this.routes[routeName];
    if (route) {
      route.addTo(this.map);

      //Ajustar el tamaño del mapa
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);

      this.selectedRoute = this.routeInfo[routeName]; // Actualiza la información de la ruta
    }
  }

  private clearMap(): void {
    Object.values(this.routes).forEach(route => this.map.removeLayer(route));
  }
}