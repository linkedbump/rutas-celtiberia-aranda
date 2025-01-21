import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-sections',
  templateUrl: './profile-sections.component.html',
  styleUrls: ['./profile-sections.component.css']
})
export class ProfileSectionsComponent {
  sections = [
    {
      title: 'Recompensas',
      items: [
        { icon: 'trophy-icon', label: 'Tesoros acumulados' },
        { icon: 'coin-icon', label: 'Aratikos acumulados' },
        { icon: 'gift-icon', label: 'Códigos promocionales' },
        { icon: 'friend-icon', label: 'Recomendar a un amigo' }
      ]
    },
    {
      title: 'Actividad',
      items: [
        { icon: 'check-icon', label: 'Retos conseguidos' },
        { icon: 'route-icon', label: 'Rutas finalizadas' },
        { icon: 'star-icon', label: 'Opiniones' },
        { icon: 'list-icon', label: 'Lista de deseos' }
      ]
    }
  ];
}
