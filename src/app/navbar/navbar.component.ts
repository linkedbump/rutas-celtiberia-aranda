import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
    // Asegurarse de que Iconify se cargue
    const script = document.createElement('script');
    script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js';
    document.head.appendChild(script);

  }
  constructor(private router: Router) {}
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}