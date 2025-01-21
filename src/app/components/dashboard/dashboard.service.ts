import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  obtenerNotificaciones(): string[] {
    return [
      'Actualización disponible: Versión 1.1',
      'Nueva ruta añadida: Sendero de los Valles',
      'Evento especial: Jornada de puertas abiertas',
    ];
  }

  obtenerNuevasRutas(): string[] {
    return [
      'Ruta del Monasterio',
      'Camino del Río',
      'Sendero del Bosque Encantado',
    ];
  }
  getUserProfile() {
    return {
      name: 'Mario Bellot Santos',
      email: 'mariobellotsantos@gmail.com',
      avatar: 'assets/user-profile.jpg'
    };
  }

  getSections() {
    return [
      {
        title: 'Recompensas',
        items: [
          { icon: 'trophy-icon', label: 'Tesoros acumulados' },
          { icon: 'coin-icon', label: 'Aratikos acumulados' }
        ]
      }
    ];
  }

  obtenerPuntosDestacados(): any[] {
    return [
      {
        id: 1,
        nombre: 'Castillo de los Sueños',
        descripcion: 'Un castillo medieval con vistas espectaculares.',
      },
      {
        id: 2,
        nombre: 'Lago Espejo',
        descripcion: 'Un lago cristalino rodeado de montañas.',
      },
    ];
  }
}
