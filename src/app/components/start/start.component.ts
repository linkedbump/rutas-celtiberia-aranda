import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsCarouselComponent } from "./components/events-carousel/events-carousel.component";
import { PlacesCarouselComponent } from "./components/places-carousel/places-carousel.component";
import { MenuCarouselComponent } from './components/menu-carousel/menu-carousel.component';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';
import { EventSingleComponent } from './components/event-single/event-single.component'; // Ajusta ruta si necesario

import * as L from 'leaflet';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PlacesCarouselComponent,
    MenuCarouselComponent,
    NavigationFooterComponent,
    EventSingleComponent
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements AfterViewInit, OnDestroy {
  map!: L.Map;
  seleccionRuta: string = '';

  puntosInteres: Record<string, { nombre: string; coords: [number, number]; categoria: string }[]> = {
    a2: [
      { nombre: 'Gotor - Yacimiento del Calvario', coords: [41.55053, -1.65494], categoria: 'yacimiento' },
      { nombre: 'Oseja - Asentamiento Celtibérico', coords: [41.59660474890612, -1.6993505633735233], categoria: 'yacimiento' },
      { nombre: 'Aranda de Moncayo Ciudad de Aratis', coords: [41.58421, -1.78753], categoria: 'aratis' },
      { nombre: 'Centro de Interpretación Aratikos', coords: [41.5675, -1.778926], categoria: 'aratis' }
      
    ],
    oeste: [
      { nombre: 'Tierga - Tergakom', coords: [41.610430955019176, -1.6012180752330374], categoria: 'yacimiento' },
      { nombre: 'Calcena Minas de Valdeplata', coords: [41.68391667083813, -1.6816897811108624], categoria: 'yacimiento' },
      { nombre: 'Purujosa - mirador ', coords: [41.68334910070195, -1.7649835733010382], categoria: 'historia' },
      { nombre: 'Beratón - Bosque Sagrado ', coords: [41.70490704776459, -1.8075254016392825], categoria: 'historia' }
    ]
  };

  ngAfterViewInit(): void {
    const waitForMapContainer = setInterval(() => {
      const mapContainer = document.getElementById('leaflet-map-instance');
      if (mapContainer) {
        clearInterval(waitForMapContainer); // Detiene el intervalo cuando se encuentra el contenedor
        this.cargarMapa();
      } else {
        console.warn("⚠️ El contenedor del mapa aún no está disponible. Reintentando...");
      }
    }, 200); // Verifica cada 200ms hasta que el contenedor esté disponible
  }
  
  ngOnDestroy(): void {
    // Limpia el mapa cuando el componente se destruye
    if (this.map) {
      this.map.remove();
    }
  }

  cargarMapa() {
    const mapElement = document.getElementById('leaflet-map-instance');
    
    if (!mapElement) {
      console.error("❌ Error: El contenedor del mapa no se ha encontrado.");
      return;
    }
    
    // Asegúrate de que el contenedor tenga un tamaño definido
    if (mapElement.clientHeight === 0) {
      mapElement.style.height = '400px';
      console.log("Se estableció una altura predeterminada para el mapa");
    }
    
    if (this.map) {
      this.map.remove();
    }
  
    console.log("Inicializando mapa en", mapElement);
    
    try {
      this.map = L.map('leaflet-map-instance').setView([41.6697, -1.75], 10);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      
      // Crea un icono personalizado para evitar el problema con marker-shadow.png
      const customIcon = L.icon({
        iconUrl: '/assets/leaflet/marker-icon.png',
        shadowUrl: '/assets/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      if (this.seleccionRuta && this.puntosInteres[this.seleccionRuta]) {
        this.puntosInteres[this.seleccionRuta].forEach((punto) => {
          L.marker(punto.coords, { icon: customIcon }).addTo(this.map)
            .bindPopup(`<b>${punto.nombre}</b>`);
        });
      }
      
      // Invalidar el tamaño después de cargar para solucionar problemas de renderizado
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
      
      console.log("✅ Mapa inicializado correctamente");
    } catch (error) {
      console.error("❌ Error inicializando el mapa:", error);
    }
  }

  seleccionarRuta(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const ruta = selectElement.value;
    
    console.log('Ruta Seleccionada:', ruta);

    this.seleccionRuta = ruta;
    this.cargarMapa();
  }
}