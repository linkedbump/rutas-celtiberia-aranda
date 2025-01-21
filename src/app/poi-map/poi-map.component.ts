// poi-map.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface PointOfInterest {
  id: number;
  title: string;
  position: { x: number; y: number };
  modelPath?: string;
  description?: string;
}

@Component({
  selector: 'app-poi-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container" [style.backgroundImage]="'url(' + backgroundImage + ')'">
      <div *ngFor="let poi of pointsOfInterest" 
           class="poi-marker"
           [style.left.%]="poi.position.x"
           [style.top.%]="poi.position.y"
           (click)="navigateToAR(poi)">
        <div class="poi-circle">
          <div class="poi-pulse"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 100vh;
      position: relative;
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .poi-marker {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    .poi-circle {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .poi-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `]
})
export class PoiMapComponent implements OnInit {
  backgroundImage = 'assets/images/map-background.jpg';
  
  pointsOfInterest: PointOfInterest[] = [
    {
      id: 1,
      title: 'Roman Theater',
      position: { x: 30, y: 40 },
      modelPath: 'assets/models/theater.glb',
      // audioUrl: 'spotify:track:...',
      description: 'This well-preserved theater showcases the cultural fusion between Roman and Celtiberian entertainment traditions.'
    }
    // Añade más puntos según necesites
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToAR(poi: PointOfInterest) {
    this.router.navigate(['/ar-viewer', poi.id]);
  }
}