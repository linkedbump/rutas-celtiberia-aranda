import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationFooterComponent } from 'src/app/shared/navigation-footer/navigation-footer.component';


@Component({
  selector: 'app-natura',
  standalone: true,
  imports: [CommonModule, NavigationFooterComponent],
  templateUrl: './natura.component.html',
  styleUrl: './natura.component.css'
})
export class NaturaComponent {

}
