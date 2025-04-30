import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapStyleService {
  public readonly customIcon = L.icon({
    iconUrl: 'assets/leaflet/triqueta.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  // Expansiones
  getIcon(tipo: 'default' | 'qr' | 'evento' = 'default'): L.Icon {
    switch (tipo) {
      case 'qr':
        return this.customIcon; // segundo custom icon
      case 'evento':
        return this.customIcon; // tercer custom icon
      default:
        return this.customIcon;
    }
  }
}