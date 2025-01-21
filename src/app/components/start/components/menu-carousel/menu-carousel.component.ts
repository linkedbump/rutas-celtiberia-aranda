import { NgFor } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'iconify-icon';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'app-menu-carousel',
  standalone: true,
  imports: [NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
  <div class="menu-carousel">
                <div class="menu-header">
                  <h2>Descurbe</h2>
                  <p>Lo que tiene para ofrecer</p>
                </div>

    <div class="menu-carousel-container">
      <div class="menu-items" #menuContainer 
           (touchstart)="onTouchStart($event)"
           (touchmove)="onTouchMove($event)"
           (touchend)="onTouchEnd()"
           (mousedown)="onMouseDown($event)"
           (mousemove)="onMouseMove($event)"
           (mouseup)="onMouseUp()"
           (mouseleave)="onMouseUp()">
        <div *ngFor="let item of menuItems" class="menu-item" (click)="navigateTo(item.link)">
          <div class="icon-circle">
            <iconify-icon [icon]="item.icon"></iconify-icon>
          </div>
          <span class="menu-label">{{item.label}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .menu-carousel {
    padding-top: 50px;
    text-align: left;
    margin-left: 50px;
    
  }
  .menu-header {
      h2 {
        font-family: 'Raleway', sans-serif;
        font-size: 30px;
        color: var(--primary-dark);
        margin: 0;
        font-weight: 800;       

      }

      p {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 14px;
        color: #6e6e6e;
        margin: 5px 0 20px;
      }
    }
    .menu-carousel-container {
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
    }

    .menu-items {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
      width: 100%;
      min-width: calc(80px * 5);
      padding: 0 10px; /* Añadido padding general*/
    }

    .menu-items::-webkit-scrollbar {
      display: none;
    }

    .menu-item {
      flex: 0 0 auto;
      width: calc(100% / 4.5);
      min-width: 100px;
      scroll-snap-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5px;
    }

    .icon-circle {
      width: 100px;
      height: 100px;
      background-color: #f8f9fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    
      &:hover {
        box-shadow: 3px 3px 4px rgba(255, 255, 255, 0.8), 
                     inset 4px 4px 10px rgba(76, 56, 133, 0.5);
                     background: rgba(224, 216, 233, 0.3); 
      }
    }

    .menu-label {
      font-size: 12px;
      text-align: center;
      color: #4c3885;
      white-space: nowrap;
    }

    .iconify {
      font-size: 40px;
      color: #4c3885;
     
    }

    iconify-icon {
      width: 60px !important;  /* Añadido !important para asegurar que se aplica*/
      height: 60px !important; /* Añadido !important para asegurar que se aplica*/
      color: #4c3885;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 60px !important; /* Añadido para asegurar el tamaño del icono*/
    }

    .tabler--tower {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='0.5'%3E%3Cpath d='M5 3h1a1 1 0 0 1 1 1v2h3V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h3V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4.394a2 2 0 0 1-.336 1.11l-1.328 1.992a2 2 0 0 0-.336 1.11V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7.394a2 2 0 0 0-.336-1.11L4.336 9.504A2 2 0 0 1 4 8.394V4a1 1 0 0 1 1-1'/%3E%3Cpath d='M10 21v-5a2 2 0 1 1 4 0v5'/%3E%3C/g%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}
/* Media queries */
@media (max-width: 768px) {
      .menu-items {
        min-width: calc(60px * 3);
        padding: 0 5px;
      }

      .menu-item {
        width: calc(100% / 3); /* Mostrar 3 elementos por vista*/
        min-width: 80px;
        padding: 0 3px;
      }

      .icon-circle {
        width: 90px;  /* Círculos más pequeños*/
        height: 90px;
        margin-bottom: 4px;
      }

      iconify-icon {
        width: 40px !important;  /* Iconos más pequeños*/
        height: 40px !important;
        font-size: 40px !important;
      }

      .menu-label {
        font-size: 12px;  /* Texto más pequeño*/
      }
    }

    /* Media query muy pequeños*/
    @media (max-width: 320px) {
      .menu-items {
        min-width: calc(50px * 2.5);
      }

      .menu-item {
        width: calc(100% / 2.5); /* Mostrar 2.5 elementos por vista*/
        min-width: 70px;
      }

      .icon-circle {
        width: 60px;
        height: 60px;
      }

      iconify-icon {
        width: 35px !important;
        height: 35px !important;
        font-size: 35px !important;
      }

      .menu-label {
        font-size: 9px;
      }
    }
  `]
})
export class MenuCarouselComponent implements AfterViewInit {
  @ViewChild('menuContainer') menuContainer!: ElementRef<HTMLElement>;
  
  private startX: number = 0;
  private scrollLeft: number = 0;
  private isMouseDown: boolean = false;
  private mouseStartX: number = 0;
  private mouseScrollLeft: number = 0;


  menuItems: MenuItem[] = [
    {
      icon: 'material-symbols-light:hiking',
      label: 'RUTAS',
      link: '/rutas'
    },
    {
      icon: 'ph:castle-turret-light',
      label: 'PUNTOS DE INTERÉS',
      link: '/puntos'
    },
    {
      icon: 'ph:farm-thin',
      label: 'ALOJAMIENTO',
      link: '/alojamiento'
    },
    {
      icon: 'ph:fork-knife-thin',
      label: 'GASTRONOMÍA',
      link: '/gastronomia'
    },
    {
      icon: 'ph:tree-thin',
      label: 'NATURALEZA',
      link: '/naturaleza'
    },
    {
      icon: 'ph:balloon-thin',
      label: 'EVENTOS',
      link: '/eventos'
    },
    {
      icon: 'material-symbols-light:linked-services-outline',
      label: 'SERVICIOS',
      link: '/servicios'
    }
  ];

  ngAfterViewInit(): void {
    if (this.menuContainer?.nativeElement) {
      this.menuContainer.nativeElement.scrollLeft = 0;
    }
  }

  onTouchStart(e: TouchEvent): void {
    if (!this.menuContainer?.nativeElement) return;
    
    this.startX = e.touches[0].pageX - this.menuContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.menuContainer.nativeElement.scrollLeft;
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.startX || !this.menuContainer?.nativeElement) return;
    
    const x = e.touches[0].pageX - this.menuContainer.nativeElement.offsetLeft;
    const walk = (this.startX - x) * 2;
    this.menuContainer.nativeElement.scrollLeft = this.scrollLeft + walk;
    e.preventDefault();
  }

  onTouchEnd(): void {
    if (!this.menuContainer?.nativeElement) return;

    this.startX = 0;
    const container = this.menuContainer.nativeElement;
    const itemWidth = container.offsetWidth / 4.5;
    const scrollPosition = container.scrollLeft;
    const targetIndex = Math.round(scrollPosition / itemWidth);
    
    container.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth'
    });
  }

  onMouseDown(e: MouseEvent): void {
    if (!this.menuContainer?.nativeElement) return;
    
    this.isMouseDown = true;
    this.mouseStartX = e.pageX - this.menuContainer.nativeElement.offsetLeft;
    this.mouseScrollLeft = this.menuContainer.nativeElement.scrollLeft;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isMouseDown || !this.menuContainer?.nativeElement) return;
    
    e.preventDefault();
    const x = e.pageX - this.menuContainer.nativeElement.offsetLeft;
    const walk = (this.mouseStartX - x) * 2;
    this.menuContainer.nativeElement.scrollLeft = this.mouseScrollLeft + walk;
  }

  onMouseUp(): void {
    if (!this.menuContainer?.nativeElement) return;
    
    this.isMouseDown = false;
    const container = this.menuContainer.nativeElement;
    const itemWidth = container.offsetWidth / 4.5;
    const scrollPosition = container.scrollLeft;
    const targetIndex = Math.round(scrollPosition / itemWidth);
    
    container.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth'
    });
  }

  navigateTo(link: string): void {
    window.location.href = link; // Redirige a la ruta especificada
  }
}