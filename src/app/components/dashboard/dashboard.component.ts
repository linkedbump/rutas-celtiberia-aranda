import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/components/dashboard/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notificaciones: string[] = [];
  nuevasRutas: string[] = [];
  puntosDestacados: any[] = [];

  constructor(private dashboardService: DashboardService) {}
 
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    try {
      this.notificaciones = this.dashboardService.obtenerNotificaciones();
      this.nuevasRutas = this.dashboardService.obtenerNuevasRutas();
      // this.puntosDestacados = this.dashboardService.obtenerPuntosDestacados(); // Comentado debido a que la propiedad no existe
    } catch (error) {
      console.error('Error al cargar datos:', error);
      // Manejo de errores adicional si es necesario
    }
  }
}
