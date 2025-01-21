import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  constructor(private router: Router) {}

  navigateTo(region: string): void {
    this.router.navigate(['/rutas', region]); // Navegamos a /rutas/aranda, /rutas/isuela o /rutas/intervalles
  }
}
