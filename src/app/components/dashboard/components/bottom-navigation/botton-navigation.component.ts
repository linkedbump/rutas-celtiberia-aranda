import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css',]
})
export class BottomNavigationComponent {
               
                navItems = [ // Asegúrate de definir la propiedad aquí
                                { label: 'Inicio', icon: 'home' },
                                { label: 'Perfil', icon: 'person' },
                                { label: 'Configuración', icon: 'settings' }
                              ];
                            
                            
                            

}
