import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-footer.component.html',
  styleUrl: './navigation-footer.component.css'
})
export class NavigationFooterComponent {
  activeButton: String = 'ar';
  
  setActive(button: string){
    this.activeButton = button;
 }
}
