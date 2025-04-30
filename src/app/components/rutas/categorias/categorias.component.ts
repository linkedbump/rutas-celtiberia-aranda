import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';

@Component({
  selector: 'app-categorias',
  imports: [NavigationFooterComponent],
  standalone: true,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']


})
export class CategoriasComponent {
  constructor(private router: Router) {}

  navigateTo(region: string): void {
    this.router.navigate(['/mapa', region]); 
  }
}
